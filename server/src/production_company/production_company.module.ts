import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ProductionCompanyController } from './production_company.controller';
import { ProductionCompanyProviders } from './production_company.providers';
import { ProductionCompanyService } from './production_company.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductionCompanyController],
  providers: [...ProductionCompanyProviders, ProductionCompanyService],
})
export class ProductionCompanyModule {}
