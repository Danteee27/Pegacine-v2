import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ProductionCountryController } from './production_country.controller';
import { ProductionCountryProviders } from './production_country.providers';
import { ProductionCountryService } from './production_country.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductionCountryController],
  providers: [...ProductionCountryProviders, ProductionCountryService],
})
export class ProductionCountryModule {}
