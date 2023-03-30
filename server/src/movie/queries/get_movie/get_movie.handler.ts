import { OkResponse } from './../../../../libs/models/responses/ok.response';
import { BaseResponse } from './../../../../libs/models/responses/base.response';
import { Repository } from 'typeorm';
import { QueryHandler } from '@nestjs/cqrs';
import { IQuery, IQueryHandler } from '@nestjs/cqrs/dist';
import { GetMovieQuery } from './get_movie.query';
import { Movie } from 'src/movie/entities';
import { BadRequestException, Inject } from '@nestjs/common';

@QueryHandler(GetMovieQuery)
export class GetMovieQueryHandler implements IQueryHandler<GetMovieQuery> {
  constructor(
    @Inject('MOVIE_REPOSITORY')
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async execute(query: GetMovieQuery): Promise<BaseResponse<Movie>> {
    const { movie_id } = query;
    const movie = await this.movieRepository.findOne({
      where: { movie_id },
      // relations: [
      //   'movie_genres.genre',
      //   'movie_cast.person',
      //   'movie_keywords',
      //   'movie_languages.languages',
      //   'movie_company.company',
      //   'movie_crew',
      //   // production_country: true,
      // ],
    });

    if (!movie) {
      throw new BadRequestException('Invalid movie ID');
    }

    return new OkResponse(movie);
  }
}
