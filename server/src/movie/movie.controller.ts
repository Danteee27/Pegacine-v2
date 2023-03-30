import { ApiTags } from '@nestjs/swagger';
import { SearchMovieQuery } from './queries/search_movie/search_movie.query';
import { Query } from '@nestjs/common/decorators';
import { GetMovieQuery } from './queries/get_movie/get_movie.query';
import { Controller, Get, Body, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs/dist';
import { QueryBus } from '@nestjs/cqrs/dist';

@ApiTags('movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  findAll() {
    //
  }

  @Get('findById')
  findById(@Query('id') id: number) {
    // return this.movieService.findById(id);
    return this.queryBus.execute(new GetMovieQuery(id));
  }

  @Get('search')
  search(
    @Query('query') query: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 30,
  ) {
    return this.queryBus.execute(new SearchMovieQuery(query, page, pageSize));
  }
}
