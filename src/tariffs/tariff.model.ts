import { Expose, Type } from 'class-transformer';

class Tariff {
  id: number;

  name: string;

  @Expose({ name: 'price_per_day' })
  @Type(() => Number)
  pricePerDay: number;

  @Expose({ name: 'max_rent_sessions_days' })
  maxRentSessionsDays: number;
}

export default Tariff;
