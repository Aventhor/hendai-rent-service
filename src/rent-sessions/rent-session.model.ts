import { Expose } from 'class-transformer';

class RentSession {
  id: number;

  @Expose({ name: 'tariff_id' })
  tariffId: number;

  @Expose({ name: 'start_date' })
  startDate: Date;

  @Expose({ name: 'end_date' })
  endDate: Date;

  discount: number;
}

export default RentSession;
