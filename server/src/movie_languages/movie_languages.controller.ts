import { Controller, Get, Body, Param } from '@nestjs/common';
import { MovieLanguagesService } from './movie_languages.service';

@Controller('movieLanguages')
export class MovieLanguagesController {
  constructor(private readonly movieLanguagesService: MovieLanguagesService) {}

  @Get()
  findAll() {
    return this.movieLanguagesService.findAll();
  }

  // @Get(':id')
  // findById(@Param('id') id: number) {
  //   return this.movieLanguagesService.findById(id);
  // }
}
