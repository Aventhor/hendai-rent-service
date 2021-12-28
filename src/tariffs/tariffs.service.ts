import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DatabaseService } from '../database/database.service';
import CreateTariffDto from './dto/create-tariff.dto';
import Tariff from './tariff.model';
import { ErrorType } from './types';

@Injectable()
export class TariffsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(): Promise<Tariff[]> {
    const tariffs = await this.databaseService.query('SELECT * FROM tariffs');
    return plainToInstance(Tariff, tariffs);
  }

  async getOne(id: number): Promise<Tariff> {
    const tariffs = await this.databaseService.query('SELECT * FROM tariffs WHERE id=$1', [id]);
    if (!tariffs.length) {
      throw new Error(ErrorType.TARIFF_NOT_FOUND);
    }
    return plainToInstance(Tariff, tariffs[0]);
  }

  async create(createTariffDto: CreateTariffDto): Promise<Tariff> {
    const tariff = await this.databaseService.query(
      'INSERT INTO tariffs (name, price_per_day) VALUES ($1, $2) RETURNING *',
      [createTariffDto.name, createTariffDto.price_per_day],
    );
    return plainToInstance(Tariff, tariff[0]);
  }
}
