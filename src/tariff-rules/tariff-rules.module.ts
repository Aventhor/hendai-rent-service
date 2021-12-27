import { Module } from '@nestjs/common';
import { TariffRulesService } from './tariff-rules.service';
import { TariffRulesController } from './tariff-rules.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [TariffRulesService],
  controllers: [TariffRulesController],
  exports: [TariffRulesService],
})
export class TariffRulesModule {}
