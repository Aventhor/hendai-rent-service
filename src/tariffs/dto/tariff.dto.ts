import { ApiProperty } from '@nestjs/swagger';

class TariffDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  pricePerDay: number;

  @ApiProperty()
  maxRentSessionsDays: number;
}

export default TariffDto;
