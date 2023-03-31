import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Body, Param } from '@nestjs/common';
import { MovieLanguagesService } from './movie_languages.service';

@ApiTags('movieLanguages')
@Controller('movieLanguages')
export class MovieLanguagesController {
  constructor(private readonly movieLanguagesService: MovieLanguagesService) {}

  @Get()
  findAll() {
    return this.movieLanguagesService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.movieLanguagesService.findById(id);
  }

  @Get('find_by_movie_id/:id')
  findByMovieId(@Param('id') id: number) {
    return this.movieLanguagesService.findByMovieId(id);
  }
}
