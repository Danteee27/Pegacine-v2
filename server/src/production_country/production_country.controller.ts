import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Body, Param } from '@nestjs/common';
import { ProductionCountryService } from './production_country.service';

@ApiTags('production_country')
@Controller('production_country')
export class ProductionCountryController {
  constructor(
    private readonly productionCountryService: ProductionCountryService,
  ) {}

  @Get()
  findAll() {
    return this.productionCountryService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.productionCountryService.findById(id);
  }

  @Get('find_by_movie_id/:id')
  findByMovieId(@Param('id') id: number) {
    return this.productionCountryService.findByMovieId(id);
  }
}
