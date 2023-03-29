import { Controller, Get, Body, Param } from '@nestjs/common';
import { MovieKeywordsService } from './movie_keywords.service';

@Controller('movie_keyword')
export class MovieKeywordsController {
  constructor(private readonly movieKeywordsService: MovieKeywordsService) {}

  @Get()
  findAll() {
    return this.movieKeywordsService.findAll();
  }

  // @Get(':id')
  // findById(@Param('id') id: number) {
  //   return this.movieKeywordsService.findById(id);
  // }
}
