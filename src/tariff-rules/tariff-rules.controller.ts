import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import CreateTariffRuleDto from './dto/CreateTariffRule.dto';
import { TariffRulesService } from './tariff-rules.service';
import TariffRule from './TariffRule.model';

@Controller('tariff-rules')
export class TariffRulesController {
  constructor(private readonly tariffRulesService: TariffRulesService) {}

  @Get('')
  @ApiOkResponse({ type: TariffRule, isArray: true })
  async getAll() {
    return await this.tariffRulesService.getAll();
  }

  @Post('')
  @ApiCreatedResponse({ type: TariffRule })
  async create(@Body() createTariffRuleDto: CreateTariffRuleDto) {
    return await this.tariffRulesService.create(createTariffRuleDto);
  }
}
