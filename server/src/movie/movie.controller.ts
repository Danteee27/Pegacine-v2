import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SearchMovieQuery } from './queries/search_movie/search_movie.query';
import { Post, Query } from '@nestjs/common/decorators';
import { GetMovieQuery } from './queries/get_movie/get_movie.query';
import { Controller, Get, Body, Param, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs/dist';
import { QueryBus } from '@nestjs/cqrs/dist';
import { AuthGuard } from 'libs/guards/clientService.guard';
import { GetMovieByGenresQuery } from './queries/get_movie_by_genres/get_movie_by_genres.query';
import { Movie } from './entities';
import { GetMovieByCastQuery } from './queries/get_movie_by_cast/get_movie_by_cast.query';
import { GetMovieByCrewQuery } from './queries/get_movie_by_crew/get_movie_by_crew.query';
import { GetMovieByCountryQuery } from './queries/get_movie_by_country/get_movie_by_country.query';
import { CreateMovieDto } from './commands/create_movie/create_movie.dto';
import { CreateMovieCommand } from './commands/create_movie/create_movie.command';

@ApiTags('movie')
@Controller('movie')
// @UseGuards(AuthGuard)
@ApiBearerAuth()
export class MovieController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

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

  @Get('find_by_country')
  findByMovieCountry(
    @Query('country_id') country_id: number,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 30,
  ) {
    return this.queryBus.execute(
      new GetMovieByCountryQuery(country_id, page, pageSize),
    );
  }

  @Get('find_by_cast')
  findByMovieCast(
    @Query('person_id') person_id: number,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 30,
  ) {
    return this.queryBus.execute(
      new GetMovieByCastQuery(person_id, page, pageSize),
    );
  }

  @Get('find_by_crew')
  findByMovieCrew(
    @Query('person_id') person_id: number,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 30,
  ) {
    return this.queryBus.execute(
      new GetMovieByCrewQuery(person_id, page, pageSize),
    );
  }

  @Post('')
  createMovie(@Body() dto: CreateMovieDto) {
    return this.commandBus.execute(new CreateMovieCommand(dto));
  }
}
