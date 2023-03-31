import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseResponse, OkResponse } from 'libs/models/responses';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Movie } from 'src/movie/entities';
import { Repository } from 'typeorm';
import { GetMovieByCrewQuery } from './get_movie_by_crew.query';

@QueryHandler(GetMovieByCrewQuery)
export class GetMovieByCrewQueryHandler
  implements IQueryHandler<GetMovieByCrewQuery>
{
  constructor(
    @Inject('MOVIE_REPOSITORY')
    readonly movieRepository: Repository<Movie>,
  ) {}
  async execute(
    query: GetMovieByCrewQuery,
  ): Promise<BaseResponse<Pagination<Movie>>> {
    const { person_id, page, pageSize } = query;
    const queryBuilder = this.movieRepository.createQueryBuilder('movie');
    queryBuilder.innerJoinAndSelect('movie.movie_crew', 'movie_crew');
    queryBuilder.where('movie_crew.person_id = :person_id', { person_id });
    const x = await paginate<Movie>(queryBuilder, {
      page: page,
      limit: pageSize,
    });
    return new OkResponse(x);
  }
}
