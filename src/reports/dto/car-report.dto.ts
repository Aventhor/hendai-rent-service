import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class CarReportDto {
  @ApiProperty()
  @Expose({ name: 'car_id' })
  carId: number;

  @ApiProperty()
  @Expose({ name: 'workload_percentage' })
  @Type(() => Number)
  workloadPercentage: number;
}

export default CarReportDto;
