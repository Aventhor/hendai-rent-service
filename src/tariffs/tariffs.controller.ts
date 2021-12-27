import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import CreateTariffDto from './dto/CreateTariff.dto';
import TariffDto from './dto/TariffDto';
import { TariffsService } from './tariffs.service';

@Controller('tariffs')
export class TariffsController {
  constructor(private readonly tariffService: TariffsService) {}

  @Get('')
  @ApiOkResponse({ type: TariffDto, isArray: true })
  async getAll() {
    return await this.tariffService.getAll();
  }

  @Post('')
  @ApiCreatedResponse({ type: TariffDto })
  async create(@Body() createTariffDto: CreateTariffDto) {
    return await this.tariffService.create(createTariffDto);
  }
}
