import { Controller, Get, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MovieCastService } from './movie_cast.service';

@ApiTags('movie_cast')
@Controller('movie_cast')
export class MovieCastController {
  constructor(private readonly movieCastService: MovieCastService) {}

  @Get()
  findAll() {
    return this.movieCastService.findAll();
  }
}
