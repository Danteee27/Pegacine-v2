import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Body, Param } from '@nestjs/common';
import { MovieKeywordsService } from './movie_keywords.service';

@ApiTags('movie_keyword')
@Controller('movie_keyword')
export class MovieKeywordsController {
  constructor(private readonly movieKeywordsService: MovieKeywordsService) {}

  @Get()
  findAll() {
    return this.movieKeywordsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.movieKeywordsService.findById(id);
  }

  @Get('find_by_movie_id/:id')
  findByMovieId(@Param('id') id: number) {
    return this.movieKeywordsService.findByMovieId(id);
  }
}
