import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import CarReportDto from './dto/car-report.dto';
import { ReportsService } from './reports.service';
import { ErrorType } from './types';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('cars')
  @ApiOkResponse({ type: CarReportDto, isArray: true })
  async getCarsReport() {
    return await this.reportsService.getCarsReport();
  }

  @Get('cars/:id')
  @ApiOkResponse({ type: CarReportDto })
  @ApiNotFoundResponse()
  async getCarReportByCarId(@Param('id', ParseIntPipe) carId: number) {
    try {
      return await this.reportsService.getCarReportByCarId(carId);
    } catch (err) {
      switch (err.message) {
        case ErrorType.CAR_NOT_FOUND: {
          throw new HttpException('Машина не найдена', HttpStatus.NOT_FOUND);
        }
      }
    }
  }
}
