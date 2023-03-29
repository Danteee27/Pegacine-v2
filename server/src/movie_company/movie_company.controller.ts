import { Controller, Get, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MovieCompanyService } from './movie_company.service';

@ApiTags('movie_company')
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
