import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SearchMovieQuery } from './queries/search_movie/search_movie.query';
import { Query } from '@nestjs/common/decorators';
import { GetMovieQuery } from './queries/get_movie/get_movie.query';
import { Controller, Get, Body, Param, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs/dist';
import { QueryBus } from '@nestjs/cqrs/dist';
import { AuthGuard } from 'libs/guards/clientService.guard';
import { GetMovieByGenresQuery } from './queries/get_movie_by_genres/get_movie_by_genres.query';
import { Movie } from './entities';
import { GetMovieByCastQuery } from './queries/get_movie_by_cast/get_movie_by_cast.query';

@ApiTags('movie')
@Controller('movie')
// @UseGuards(AuthGuard)
@ApiBearerAuth()
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
  ): Promise<Movie[]> {
    return this.queryBus.execute(new SearchMovieQuery(query, page, pageSize));
  }

  @Get('find_by_movie_genres')
  findByMovieGenres(
    @Query('genre_id') genre_id: number,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 30,
  ) {
    return this.queryBus.execute(
      new GetMovieByGenresQuery(genre_id, page, pageSize),
    );
  }

  @Get('find_by_movie_cast')
  findByMovieCast(
    @Query('person_id') person_id: number,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 30,
  ) {
    return this.queryBus.execute(
      new GetMovieByCastQuery(person_id, page, pageSize),
    );
  }
}
