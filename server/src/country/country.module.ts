import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CountryController } from './country.controller';
import { CountryProviders } from './country.providers';
import { CountryService } from './country.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CountryController],
  providers: [...CountryProviders, CountryService],
})
export class CountryModule {}
