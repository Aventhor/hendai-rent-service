import { Expose } from 'class-transformer';

class Rent {
  id: number;

  @Expose({ name: 'start_date' })
  startDate: Date;

  @Expose({ name: 'end_date' })
  endDate: Date;

  cost: number;
}

export default Rent;
