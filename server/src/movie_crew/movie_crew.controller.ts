import { Controller, Get, Body, Param } from '@nestjs/common';
import { MovieCrewService } from './movie_crew.service';

@Controller('movie_crew')
export class MovieCrewController {
  constructor(private readonly movieCrewService: MovieCrewService) {}

  @Get()
  findAll() {
    return this.movieCrewService.findAll();
  }

  // @Get(':id')
  // findById(@Param('id') id: number) {
  //   return this.movieCrewService.findById(id);
  // }
}
