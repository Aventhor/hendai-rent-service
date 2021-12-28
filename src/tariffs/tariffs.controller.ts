import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import CreateTariffDto from './dto/create-tariff.dto';
import TariffDto from './dto/tariff.dto';
import { TariffsService } from './tariffs.service';

@Controller('tariffs')
export class TariffsController {
  constructor(private readonly tariffService: TariffsService) {}

  @Get('')
  @ApiOkResponse({ type: TariffDto, isArray: true })
  async getAll() {
    const tariffs = await this.tariffService.getAll();
    return plainToInstance(TariffDto, tariffs);
  }

  @Post('')
  @ApiCreatedResponse({ type: TariffDto })
  async create(@Body() createTariffDto: CreateTariffDto) {
    const tariff = await this.tariffService.create(createTariffDto);
    return plainToInstance(TariffDto, tariff);
  }
}
