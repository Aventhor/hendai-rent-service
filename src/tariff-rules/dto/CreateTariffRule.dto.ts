import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';

class CreateTariffRuleDto {
  @ApiProperty()
  @IsInt()
  tariff_id: number;

  @ApiProperty()
  @IsInt()
  start_day: number;

  @ApiProperty()
  @IsInt()
  end_day: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(0)
  discount: number;
}

export default CreateTariffRuleDto;
