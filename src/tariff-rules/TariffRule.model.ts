import { Expose } from 'class-transformer';

class TariffRule {
  id: number;

  @Expose({ name: 'tariff_id' })
  tariffId: number;

  @Expose({ name: 'start_day' })
  startDay: number;

  @Expose({ name: 'end_day' })
  endDay: number;

  discount: number;
}

export default TariffRule;
