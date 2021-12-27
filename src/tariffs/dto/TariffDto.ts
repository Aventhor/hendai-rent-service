import { ApiProperty } from '@nestjs/swagger';

class TariffDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price_per_day: number;
}

export default TariffDto;
