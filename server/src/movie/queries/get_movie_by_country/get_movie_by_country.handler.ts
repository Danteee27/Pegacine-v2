import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OkResponse } from 'libs/models/responses';
import { paginate } from 'nestjs-typeorm-paginate';
import { Movie } from 'src/movie/entities';
import { Repository } from 'typeorm';
import { GetMovieByCountryQuery } from './get_movie_by_country.query';

@QueryHandler(GetMovieByCountryQuery)
export class GetMovieByCountryQueryHandler
  implements IQueryHandler<GetMovieByCountryQuery>
{
  constructor(
    @Inject('MOVIE_REPOSITORY')
    readonly movieRepository: Repository<Movie>,
  ) {}

  async execute(query: GetMovieByCountryQuery): Promise<any> {
    const { country_id, page, pageSize } = query;
    const queryBuilder = this.movieRepository.createQueryBuilder('movie');
    queryBuilder.innerJoinAndSelect(
      'movie.production_country',
      'production_country',
    );
    queryBuilder.where('production_country.country_id = :country_id', {
      country_id,
    });
    const x = await paginate<Movie>(queryBuilder, {
      page: page,
      limit: pageSize,
    });
    return new OkResponse(x);
  }
}
