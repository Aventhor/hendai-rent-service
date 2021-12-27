import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DatabaseService } from 'src/database/database.service';
import { TariffRulesService } from 'src/tariff-rules/tariff-rules.service';
import { TariffsService } from 'src/tariffs/tariffs.service';
import CreateRentSessionDto from './dto/create-rent-session.dto';
import RentSession from './RentSession.model';

@Injectable()
export class RentSessionsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly tariffsService: TariffsService,
    private readonly tariffRulesService: TariffRulesService,
  ) {}

  async getAll(): Promise<RentSession[]> {
    const sessions = await this.databaseService.query(
      'SELECT * FROM rent_sessions',
    );
    return sessions.map((session) => plainToInstance(RentSession, session));
  }

  async getOne(id: number): Promise<RentSession> {
    const session = await this.databaseService.query(
      'SELECT * FROM rent_sessions WHERE id=$1',
      [id],
    );
    return plainToInstance(RentSession, session[0]);
  }

  async create(
    createRentSessionDto: CreateRentSessionDto,
  ): Promise<RentSession> {
    const sessions = await this.databaseService.query(
      'INSERT INTO rent_sessions (car_id, tariff_id, start_date, end_date, cost) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [
        createRentSessionDto.car_id,
        createRentSessionDto.tariff_id,
        createRentSessionDto.start_date,
        createRentSessionDto.end_date,
        1000,
      ],
    );
    return plainToInstance(RentSession, sessions[0]);
  }
}
