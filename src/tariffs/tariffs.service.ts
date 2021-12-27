import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import TariffRule from 'src/tariff-rules/TariffRule.model';
import { DatabaseService } from '../database/database.service';
import CreateTariffDto from './dto/CreateTariff.dto';
import Tariff from './tariff.model';

@Injectable()
export class TariffsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll() {
    const tariffs = await this.databaseService.query('SELECT * FROM tariffs');
    return tariffs.map((tariff) => plainToInstance(Tariff, tariff));
  }

  async getOne(id: number): Promise<Tariff> {
    const tariffs = await this.databaseService.query(
      'SELECT * FROM tariffs WHERE id=$1',
      [id],
    );
    return plainToInstance(Tariff, tariffs[0]);
  }

  async create(createTariffDto: CreateTariffDto) {
    const tariff = await this.databaseService.query(
      'INSERT INTO tariffs (name, price_per_day) VALUES ($1, $2) RETURNING *',
      [createTariffDto.name, createTariffDto.price_per_day],
    );
    return plainToInstance(Tariff, tariff[0]);
  }

  calcCost(tariff: Tariff, tariffRules: TariffRule[], period: number): number {
    const { pricePerDay } = tariff;
    let totalPrice: number = 0;

    [...Array(period).keys()].forEach((i) => {
      const day = i + 1;
      const rule = tariffRules.find(
        (el) => day >= el.startDay && day <= el.endDay,
      );

      if (!rule || !rule.discount) {
        totalPrice += pricePerDay;
        return;
      }

      totalPrice += pricePerDay - (rule.discount / 100) * pricePerDay;
    });

    return totalPrice;
  }
}
