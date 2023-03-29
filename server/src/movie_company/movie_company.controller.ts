import { Controller, Get, Body, Param } from '@nestjs/common';
import { MovieCompanyService } from './movie_company.service';

@Controller('movie_company')
export class MovieCompanyController {
  constructor(private readonly movieCompanyService: MovieCompanyService) {}

  @Get()
  findAll() {
    return this.movieCompanyService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.movieCompanyService.findById(id);
  }
}
