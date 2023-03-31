import { Controller, Get, Body, Param, Post, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Genre } from './entities';
import { GenreService } from './genre.service';

@ApiTags('genre')
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

  @Post()
  create(@Body() genre: Genre) {
    return this.genreService.create(genre);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.genreService.delete(id);
  }
}
