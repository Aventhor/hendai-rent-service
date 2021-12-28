import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

@Injectable()
export class UtilsService {
  getDaysBetweenDates(date1: Date, date2: Date): number {
    return dayjs(date1).diff(date2, 'days');
  }

  isWeekend(date: Date): boolean {
    return [0, 6].indexOf(dayjs(date).get('day')) !== -1;
  }

  isAfter(date1: Date, date2: Date): boolean {
    return dayjs(date1).isAfter(date2);
  }
}
