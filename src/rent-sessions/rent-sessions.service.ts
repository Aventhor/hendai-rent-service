import { UtilsService } from '@app/utils';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DatabaseService } from 'src/database/database.service';
import { TariffRulesService } from 'src/tariff-rules/tariff-rules.service';
import TariffRule from 'src/tariff-rules/tariff-rule.model';
import Tariff from 'src/tariffs/tariff.model';
import { TariffsService } from 'src/tariffs/tariffs.service';
import CreateRentSessionDto from './dto/create-rent-session.dto';
import RentSession from './rent-session.model';
import { ErrorType } from './types';

@Injectable()
export class RentSessionsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly tariffsService: TariffsService,
    private readonly tariffRulesService: TariffRulesService,
    private readonly utilsService: UtilsService,
  ) {}

  async getAll(): Promise<RentSession[]> {
    const sessions = await this.databaseService.query('SELECT * FROM rent_sessions');
    return plainToInstance(RentSession, sessions);
  }

  async getOne(id: number): Promise<RentSession> {
    const sessions = await this.databaseService.query('SELECT * FROM rent_sessions WHERE id=$1', [id]);
    if (!sessions.length) {
      throw new Error(ErrorType.RENT_SESSION_NOT_FOUND);
    }
    return plainToInstance(RentSession, sessions[0]);
  }

  async checkCarAvailable(carId: number, startDate: Date, endDate: Date): Promise<boolean> {
    const sessions = await this.databaseService.query(
      'SELECT * FROM rent_sessions WHERE car_id=$1 and ((start_date >= $2 and start_date <= $3) or (end_date >= $2 and end_date <= $3))',
      [carId, startDate, endDate],
    );
    return !sessions.length;
  }

  async checkSessionAvailable(carId: number, startDate: Date): Promise<boolean> {
    const sessions = await this.databaseService.query(
      'SELECT * FROM rent_sessions WHERE car_id=$1 ORDER BY id ASC LIMIT 1',
      [carId],
    );
    const session = plainToInstance(RentSession, sessions[0]);
    return this.utilsService.getDaysBetweenDates(startDate, session.endDate) >= 3;
  }

  async getCost(tariffId: number, startDate: Date, endDate: Date) {
    const tariff = await this.tariffsService.getOne(tariffId);
    const tariffRules = await this.tariffRulesService.getAllByTariffId(tariffId);
    if (this.utilsService.isAfter(startDate, endDate)) {
      throw new Error(ErrorType.START_DATE_IS_AFTER);
    }
    const period = this.utilsService.getDaysBetweenDates(endDate, startDate);
    return this.calcCost(tariff, tariffRules, period);
  }

  async create(createRentSessionDto: CreateRentSessionDto): Promise<RentSession> {
    if (this.utilsService.isAfter(createRentSessionDto.start_date, createRentSessionDto.end_date)) {
      throw new Error(ErrorType.START_DATE_IS_AFTER);
    }

    const isCarAvailable = await this.checkCarAvailable(
      createRentSessionDto.car_id,
      createRentSessionDto.start_date,
      createRentSessionDto.end_date,
    );

    if (!isCarAvailable) {
      throw new Error(ErrorType.CAR_NOT_FOUND);
    }

    const isSessionAvailable = await this.checkSessionAvailable(
      createRentSessionDto.car_id,
      createRentSessionDto.start_date,
    );

    if (!isSessionAvailable) {
      throw new Error(ErrorType.RENT_MIN_SESSION_INTERVAL);
    }

    if (
      this.utilsService.isWeekend(createRentSessionDto.start_date) ||
      this.utilsService.isWeekend(createRentSessionDto.end_date)
    ) {
      throw new Error(ErrorType.RENT_SESSION_WEEKEND);
    }

    const period = this.utilsService.getDaysBetweenDates(
      createRentSessionDto.end_date,
      createRentSessionDto.start_date,
    );

    const tariff = await this.tariffsService.getOne(createRentSessionDto.tariff_id);

    if (period > tariff.maxRentSessionsDays) {
      throw new Error(ErrorType.RENT_SESSION_MAX_PERIOD);
    }

    const rules = await this.tariffRulesService.getAllByTariffId(createRentSessionDto.tariff_id);
    const sessions = await this.databaseService.query(
      'INSERT INTO rent_sessions (car_id, tariff_id, start_date, end_date, cost) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [
        createRentSessionDto.car_id,
        createRentSessionDto.tariff_id,
        createRentSessionDto.start_date,
        createRentSessionDto.end_date,
        this.calcCost(tariff, rules, period),
      ],
    );
    return plainToInstance(RentSession, sessions[0]);
  }

  calcCost(tariff: Tariff, tariffRules: TariffRule[] = [], period: number = 0): number {
    const { pricePerDay = 0 } = tariff;
    let totalPrice: number = 0;

    [...Array(period).keys()].forEach((i) => {
      const day = i + 1;
      const rule = tariffRules.find((el) => day >= el.startDay && day <= el.endDay);

      if (!rule || !rule.discount) {
        totalPrice += pricePerDay;
        return;
      }

      totalPrice += pricePerDay - (rule.discount / 100) * pricePerDay;
    });

    return totalPrice;
  }
}
