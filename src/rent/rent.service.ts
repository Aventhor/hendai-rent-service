import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RentService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll() {
    return await this.databaseService.query('SELECT * FROM rent');
  }

  async getOne(id: number) {
    return await this.databaseService.query(
      'SELECT * FROM rent WHERE id=$1 LIMIT 1',
      [id],
    );
  }

  async create(createRentDto) {
    await this.databaseService.query('INSERT INTO rent VALUES', []);
  }
}
