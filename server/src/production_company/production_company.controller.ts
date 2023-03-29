import { Controller, Get, Body, Param } from '@nestjs/common';
import { ProductionCompanyService } from './production_company.service';

@Controller('productionCompany')
export class ProductionCompanyController {
  constructor(
    private readonly productionCompanyService: ProductionCompanyService,
  ) {}

  @Get()
  findAll() {
    return this.productionCompanyService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.productionCompanyService.findById(id);
  }
}
