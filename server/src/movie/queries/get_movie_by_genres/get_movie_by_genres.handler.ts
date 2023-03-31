import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BaseResponse, OkResponse } from 'libs/models/responses';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Movie } from 'src/movie/entities';
import { MovieGenres } from 'src/movie_genres/entities';
import { Repository } from 'typeorm';
import { GetMovieByGenresQuery } from './get_movie_by_genres.query';

@QueryHandler(GetMovieByGenresQuery)
export class GetMovieByGenresQueryHandler
  implements IQueryHandler<GetMovieByGenresQuery>
{
  constructor(
    @Inject('MOVIE_REPOSITORY')
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async execute(
    query: GetMovieByGenresQuery,
  ): Promise<BaseResponse<Pagination<Movie>>> {
    const { genre_id, page, pageSize } = query;
    const queryBuilder = this.movieRepository.createQueryBuilder('movie');
    queryBuilder.innerJoinAndSelect('movie.movie_genres', 'movie_genres');
    queryBuilder.where('movie_genres.genre_id = :genre_id', { genre_id });
    const x = await paginate<Movie>(queryBuilder, {
      page: page,
      limit: pageSize,
    });

    return new OkResponse(x);
  }
}
