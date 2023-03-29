import { Controller, Get, Body, Param } from '@nestjs/common';
import { MovieGenresService } from './movie_genres.service';

@Controller('movie_genres')
export class MovieGenresController {
  constructor(private readonly movieGenreService: MovieGenresService) {}

  @Get()
  findAll() {
    return this.movieGenreService.findAll();
  }

  // @Get(':id')
  // findById(@Param('id') id: number) {
  //   return this.movieGenreService.findById(id);
  // }
}
