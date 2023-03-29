import { Controller, Get, Body, Param } from '@nestjs/common';
import { ProductionCountryService } from './production_country.service';

@Controller('production_country')
export class ProductionCountryController {
  constructor(
    private readonly productionCountryService: ProductionCountryService,
  ) {}

  @Get()
  findAll() {
    return this.productionCountryService.findAll();
  }
}
