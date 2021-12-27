import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TariffsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll() {
    return await this.databaseService.query('SELECT * FROM tariffs');
  }
}
