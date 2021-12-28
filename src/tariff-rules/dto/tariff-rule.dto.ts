import { ApiProperty } from '@nestjs/swagger';

class TariffRuleDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  tariffId: number;

  @ApiProperty()
  startDay: number;

  @ApiProperty()
  endDay: number;

  @ApiProperty()
  discount: number;
}

export default TariffRuleDto;
