import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DatabaseService } from 'src/database/database.service';
import CreateTariffRuleDto from './dto/create-tariff-rule.dto';
import TariffRule from './tariff-rule.model';

@Injectable()
export class TariffRulesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(): Promise<TariffRule[]> {
    const tariffRules = await this.databaseService.query('SELECT * FROM tariff_rules');
    return plainToInstance(TariffRule, tariffRules);
  }

  async getAllByTariffId(tariffId: number): Promise<TariffRule[]> {
    const tariffRules = await this.databaseService.query('SELECT * FROM tariff_rules WHERE tariff_id=$1', [tariffId]);
    return plainToInstance(TariffRule, tariffRules);
  }

  async create(createTariffRuleDto: CreateTariffRuleDto): Promise<TariffRule> {
    const rules = await this.databaseService.query(
      'INSERT INTO tariff_rules (tariff_id, start_day, end_day, discount) VALUES ($1, $2, $3, $4) RETURNING *',
      [
        createTariffRuleDto.tariff_id,
        createTariffRuleDto.start_day,
        createTariffRuleDto.end_day,
        createTariffRuleDto.discount,
      ],
    );
    return plainToInstance(TariffRule, rules[0]);
  }
}
