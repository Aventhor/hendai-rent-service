import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import CreateRentSessionDto from './dto/create-rent-session.dto';
import { RentSessionsService } from './rent-sessions.service';
import { ErrorType } from './types';
import { ErrorType as TariffsErrorType } from '../tariffs/types';
import { plainToInstance } from 'class-transformer';
import RentSessionDto from './dto/rent-session.dto';

@Controller('rent-sessions')
export class RentSessionsController {
  constructor(private readonly rentSessionsService: RentSessionsService) {}

  @Get('')
  @ApiOkResponse({ type: RentSessionDto, isArray: true })
  async getAll() {
    const sessions = await this.rentSessionsService.getAll();
    return plainToInstance(RentSessionDto, sessions);
  }

  @Get('/cost')
  @ApiOkResponse({ type: Number })
  @ApiNotFoundResponse()
  async getCost(
    @Query('tariff_id', ParseIntPipe) tariffId: number,
    @Query('start_date') startDate: string,
    @Query('end_date') endDate: string,
  ) {
    try {
      return await this.rentSessionsService.getCost(tariffId, new Date(startDate), new Date(endDate));
    } catch (err) {
      switch (err.message) {
        case TariffsErrorType.TARIFF_NOT_FOUND: {
          throw new HttpException('Тариф не найден', HttpStatus.NOT_FOUND);
        }
        case ErrorType.START_DATE_IS_AFTER: {
          throw new HttpException('Дата начала аренды не может быть позже даты окончания', HttpStatus.BAD_REQUEST);
        }
        default: {
          throw new HttpException('Внутренная ошибка', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    }
  }

  @Get(':id')
  @ApiOkResponse({ type: RentSessionDto })
  @ApiNotFoundResponse()
  async getOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const session = await this.rentSessionsService.getOne(id);
      return plainToInstance(RentSessionDto, session);
    } catch (err) {
      switch (err.message) {
        case ErrorType.RENT_SESSION_NOT_FOUND: {
          throw new HttpException('Сессия аренды не найдена', HttpStatus.NOT_FOUND);
        }
      }
    }
  }

  @Post('')
  @ApiCreatedResponse({ type: RentSessionDto })
  @ApiNotFoundResponse()
  async create(@Body() createRentSessionDto: CreateRentSessionDto) {
    try {
      const session = await this.rentSessionsService.create(createRentSessionDto);
      return plainToInstance(RentSessionDto, session);
    } catch (err) {
      switch (err.message) {
        case ErrorType.CAR_IS_BUSY: {
          throw new HttpException('Выбранная машина уже забронирована на данный период', HttpStatus.BAD_REQUEST);
        }
        case ErrorType.RENT_SESSION_WEEKEND: {
          throw new HttpException(
            'Дата начала и окончания бронирования не может выпадать на выходной день',
            HttpStatus.BAD_REQUEST,
          );
        }
        case ErrorType.RENT_MIN_SESSION_INTERVAL: {
          throw new HttpException('Между сеансами бронирования должно пройти не менее 3х дней', HttpStatus.BAD_REQUEST);
        }
        case ErrorType.RENT_SESSION_MAX_PERIOD: {
          throw new HttpException('Выбранный период аренды превышает максимально доступный', HttpStatus.BAD_REQUEST);
        }
        case ErrorType.START_DATE_IS_AFTER: {
          throw new HttpException('Дата начала аренды не может быть позже даты окончания', HttpStatus.BAD_REQUEST);
        }
        default: {
          throw new HttpException('Внутренная ошибка', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    }
  }
}
