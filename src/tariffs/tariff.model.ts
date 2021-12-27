import { Expose, Type } from 'class-transformer';

class Tariff {
  id: number;

  name: string;

  @Expose({ name: 'price_per_day' })
  @Type(() => Number)
  pricePerDay: number;
}

export default Tariff;
