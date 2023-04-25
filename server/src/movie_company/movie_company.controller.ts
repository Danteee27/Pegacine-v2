import { Controller, Get, Body, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MovieCompanyService } from './movie_company.service';
import { MovieCompany } from './entities/movie_company.entity';

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

  @Get('find_by_movie_id/:id')
  findByMovieId(@Param('id') id: number) {
    return this.movieCompanyService.findByMovieId(id);
  }

  // @Post()
  // createCompany(@Body() company: MovieCompany) {
  //   return this.movieCompanyService.create(company);
  // }
}
