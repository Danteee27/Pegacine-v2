import { Controller, Get, Body, Param, Post, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MovieGenresService } from './movie_genres.service';
import { MovieGenres } from './entities';

@ApiTags('movie_genres')
@Controller('movie_genres')
export class MovieGenresController {
  constructor(private readonly movieGenreService: MovieGenresService) {}

  @Get()
  findAll() {
    return this.movieGenreService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.movieGenreService.findById(id);
  }

  @Get('find_by_movie_id/:id')
  findByMovieId(@Param('id') id: number) {
    return this.movieGenreService.findByMovieId(id);
  }

  @Post()
  create(@Body() movieGenre: MovieGenres) {
    return this.movieGenreService.create(movieGenre);
  }

  @Delete()
  delete(@Body() movieGenre: MovieGenres) {
    return this.movieGenreService.delete(movieGenre);
  }
}
