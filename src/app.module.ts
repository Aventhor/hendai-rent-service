import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TariffsModule } from './tariffs/tariffs.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TariffRulesModule } from './tariff-rules/tariff-rules.module';
import { RentSessionsModule } from './rent-sessions/rent-sessions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TariffsModule,
    DatabaseModule,
    TariffRulesModule,
    RentSessionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
