import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import CreateTariffRuleDto from './dto/create-tariff-rule.dto';
import { TariffRulesService } from './tariff-rules.service';
import { plainToInstance } from 'class-transformer';
import TariffRuleDto from './dto/tariff-rule.dto';

@Controller('tariff-rules')
export class TariffRulesController {
  constructor(private readonly tariffRulesService: TariffRulesService) {}

  @Get('')
  @ApiOkResponse({ type: TariffRuleDto, isArray: true })
  async getAll() {
    const rule = await this.tariffRulesService.getAll();
    return plainToInstance(TariffRuleDto, rule);
  }

  @Post('')
  @ApiCreatedResponse({ type: TariffRuleDto })
  async create(@Body() createTariffRuleDto: CreateTariffRuleDto) {
    const rules = await this.tariffRulesService.create(createTariffRuleDto);
    return plainToInstance(TariffRuleDto, rules);
  }
}
