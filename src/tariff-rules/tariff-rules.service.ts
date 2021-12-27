import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DatabaseService } from 'src/database/database.service';
import CreateTariffRuleDto from './dto/CreateTariffRule.dto';
import TariffRule from './TariffRule.model';

@Injectable()
export class TariffRulesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll() {
    const tariffRules = await this.databaseService.query(
      'SELECT * FROM tariff_rules',
    );
    return tariffRules.map((tariff) => plainToInstance(TariffRule, tariff));
  }

  async getByTariffIds(tariffId: number) {
    const tariffRules = await this.databaseService.query(
      'SELECT * FROM tariff_rules WHERE tariff_id=$1',
      [tariffId],
    );
    return tariffRules.map((tariff) => plainToInstance(TariffRule, tariff));
  }

  async create(createTariffRuleDto: CreateTariffRuleDto) {
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
