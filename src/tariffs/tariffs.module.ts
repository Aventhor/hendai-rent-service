import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TariffsController } from './tariffs.controller';
import { TariffsService } from './tariffs.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TariffsController],
  providers: [TariffsService],
})
export class TariffsModule {}
