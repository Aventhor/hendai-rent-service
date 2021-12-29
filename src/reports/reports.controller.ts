import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import CarReportDto from './dto/car-report.dto';
import { ReportsService } from './reports.service';
import { ErrorType } from './types';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('cars')
  @ApiOkResponse({ type: CarReportDto, isArray: true })
  async getCarsReport() {
    const reports = await this.reportsService.getCarsReport();
    return plainToInstance(CarReportDto, reports);
  }

  @Get('cars/:id')
  @ApiOkResponse({ type: CarReportDto })
  @ApiNotFoundResponse()
  async getCarReportByCarId(@Param('id', ParseIntPipe) carId: number) {
    try {
      const report = await this.reportsService.getCarReportByCarId(carId);
      return plainToInstance(CarReportDto, report);
    } catch (err) {
      switch (err.message) {
        case ErrorType.CAR_NOT_FOUND: {
          throw new HttpException('Машина не найдена', HttpStatus.NOT_FOUND);
        }
      }
    }
  }
}
