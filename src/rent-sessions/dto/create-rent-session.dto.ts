import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

class CreateRentSessionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  car_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  tariff_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  start_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  end_date: Date;
}

export default CreateRentSessionDto;
