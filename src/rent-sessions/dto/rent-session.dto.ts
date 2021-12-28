import { ApiProperty } from '@nestjs/swagger';

class RentSessionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  tariffId: number;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  discount: number;
}

export default RentSessionDto;
