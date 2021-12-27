import { Controller, Get } from '@nestjs/common';
import { TariffsService } from './tariffs.service';

@Controller('tariffs')
export class TariffsController {
  constructor(private readonly tariffService: TariffsService) {}

  @Get('')
  async getAll() {
    return await this.tariffService.getAll();
  }
}
