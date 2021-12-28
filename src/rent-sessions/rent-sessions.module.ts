import { UtilsService } from '@app/utils';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TariffRulesService } from 'src/tariff-rules/tariff-rules.service';
import { TariffsService } from 'src/tariffs/tariffs.service';
import { RentSessionsController } from './rent-sessions.controller';
import { RentSessionsService } from './rent-sessions.service';

@Module({
  imports: [DatabaseModule],
  providers: [RentSessionsService, TariffsService, TariffRulesService, UtilsService],
  controllers: [RentSessionsController],
  exports: [RentSessionsService],
})
export class RentSessionsModule {}
