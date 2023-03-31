import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseResponse, OkResponse } from 'libs/models/responses';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Movie } from 'src/movie/entities';
import { Repository } from 'typeorm';
import { GetMovieByCastQuery } from './get_movie_by_cast.query';

@QueryHandler(GetMovieByCastQuery)
export class GetMovieByCastQueryHandler
  implements IQueryHandler<GetMovieByCastQuery>
{
  constructor(
    @Inject('MOVIE_REPOSITORY')
    readonly movieRepository: Repository<Movie>,
  ) {}
  async execute(
    query: GetMovieByCastQuery,
  ): Promise<BaseResponse<Pagination<Movie>>> {
    const { person_id, page, pageSize } = query;
    const queryBuilder = this.movieRepository.createQueryBuilder('movie');
    queryBuilder.innerJoinAndSelect('movie.movie_cast', 'movie_cast');
    queryBuilder.where('movie_cast.person_id = :person_id', { person_id });
    const x = await paginate<Movie>(queryBuilder, {
      page: page,
      limit: pageSize,
    });
    return new OkResponse(x);
  }
}
