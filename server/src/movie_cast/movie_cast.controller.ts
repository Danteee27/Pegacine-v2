import { Controller, Get, Body, Param } from '@nestjs/common';
import { MovieCastService } from './movie_cast.service';

@Controller('movie_cast')
export class MovieCastController {
  constructor(private readonly movieCastService: MovieCastService) {}

  @Get()
  findAll() {
    return this.movieCastService.findAll();
  }
}
