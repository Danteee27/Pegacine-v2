import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SearchMovieQuery } from './queries/search_movie/search_movie.query';
import { Inject, Post, Put, Query } from '@nestjs/common/decorators';
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
import { CreateSeriesDto } from './commands/create_series/create_series.dto';
import { CreateSeriesCommand } from './commands/create_series/create_series.command';
import { GetSeriesQuery } from './queries/get_series/get_series.query';
import { Repository } from 'typeorm';
import { Series } from './entities/series.entity';
import { UpdateMovieDto } from './commands/update_movie/update_movie.dto';
import { UpdateMovieCommand } from './commands/update_movie/update_movie.command';
import { UpdateSeriesDto } from './commands/update_series/update_series.dto';
import { UpdateSeriesCommand } from './commands/update_series/update_series.command';

@ApiTags('movie')
@Controller('movie')
// @UseGuards(AuthGuard)
@ApiBearerAuth()
export class MovieController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    @Inject('SERIES_REPOSITORY')
    private readonly seriesRepository: Repository<Series>,
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
    @Query('sort') sort: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 30,
  ): Promise<Movie[]> {
    return this.queryBus.execute(
      new SearchMovieQuery(query, sort, page, pageSize),
    );
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

  @Post('series')
  createSeries(@Body() dto: CreateSeriesDto) {
    return this.commandBus.execute(new CreateSeriesCommand(dto));
  }

  @Get('series')
  async getAllSeries() {
    return await this.seriesRepository.find({
      relations: ['movies'],
    });
  }

  @Get('series/:id')
  getSeries(@Param('id') id: number) {
    return this.queryBus.execute(new GetSeriesQuery(id));
  }

  @Put(':id')
  updateMovie(@Param('id') id: number, @Body() dto: UpdateMovieDto) {
    return this.commandBus.execute(new UpdateMovieCommand(id, dto));
  }

  @Put('series/:id')
  updateSeries(@Param('id') id: number, @Body() dto: UpdateSeriesDto) {
    return this.commandBus.execute(new UpdateSeriesCommand(id, dto));
  }
}
