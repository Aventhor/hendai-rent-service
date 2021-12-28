import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DatabaseService } from 'src/database/database.service';
import CarReportDto from './dto/car-report.dto';
import { ErrorType } from './types';

@Injectable()
export class ReportsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getCarReportByCarId(carId: number) {
    const reports = await this.databaseService.query(
      `SELECT car_id, sum(round((end_date - start_date) * 100 / 30::decimal, 2)) as workload_percentage FROM rent_sessions WHERE car_id=$1 and date_trunc('month',start_date) = date_trunc('month',CURRENT_DATE) GROUP BY car_id;`,

      [carId],
    );
    if (!reports.length) {
      throw new Error(ErrorType.CAR_NOT_FOUND);
    }
    return plainToInstance(CarReportDto, reports[0]);
  }

  async getCarsReport() {
    const reports = await this.databaseService.query(
      `SELECT car_id, sum(round((end_date - start_date) * 100 / 30::decimal, 2)) as workload_percentage FROM rent_sessions WHERE date_trunc('month',start_date) = date_trunc('month',CURRENT_DATE) GROUP BY car_id;`,
    );
    return plainToInstance(CarReportDto, reports);
  }
}
