import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { TariffRulesService } from 'src/tariff-rules/tariff-rules.service';
import { TariffsService } from 'src/tariffs/tariffs.service';
import CreateRentSessionDto from './dto/create-rent-session.dto';
import { RentSessionsService } from './rent-sessions.service';
import RentSession from './RentSession.model';

@Controller('rent-sessions')
export class RentSessionsController {
  constructor(
    private readonly rentSessionsService: RentSessionsService,
    private readonly tariffsService: TariffsService,
    private readonly tariffRulesService: TariffRulesService,
  ) {}

  @Get('')
  @ApiOkResponse({ type: RentSession, isArray: true })
  async getAll() {
    return await this.rentSessionsService.getAll();
  }

  @Get('/cost')
  @ApiOkResponse({ type: 'number' })
  async getCost(
    @Query('tariff_id', ParseIntPipe) tariffId: number,
    @Query('period', ParseIntPipe) period: number,
  ) {
    const tariff = await this.tariffsService.getOne(tariffId);
    const tariffRules = await this.tariffRulesService.getByTariffIds(tariffId);
    return await this.tariffsService.calcCost(tariff, tariffRules, period);
  }

  @Get(':id')
  @ApiOkResponse({ type: RentSession })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const session = await this.rentSessionsService.getOne(id);
    if (!session)
      throw new HttpException('Rent session not found', HttpStatus.NOT_FOUND);
    return session;
  }

  @Post('')
  @ApiCreatedResponse({ type: RentSession })
  async create(@Body() createRentSessionDto: CreateRentSessionDto) {
    return await this.rentSessionsService.create(createRentSessionDto);
  }
}
