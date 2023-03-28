import { Controller, Get, Body, Param } from '@nestjs/common';
import { GenreService } from './genre.service';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  findAll() {
    return this.genreService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.genreService.findById(id);
  }
}
