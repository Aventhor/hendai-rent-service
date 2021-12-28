import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class CarReportDto {
  @ApiProperty()
  car_id: number;

  @ApiProperty()
  @Expose({ name: 'workload_percentage' })
  @Type(() => Number)
  workloadPercentage: number;
}

export default CarReportDto;
