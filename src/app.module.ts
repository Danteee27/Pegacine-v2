import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryModule } from './country/country.module';

@Module({
  imports: [
    CountryModule,
    DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
