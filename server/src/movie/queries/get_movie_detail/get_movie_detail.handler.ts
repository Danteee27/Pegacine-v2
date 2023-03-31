import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Movie } from 'src/movie/entities';
import { Repository } from 'typeorm';
import { GetMovieDetailQuery } from './get_movie_detail.query';

@QueryHandler(GetMovieDetailQuery)
export class GetMovieDetailQueryHandler
  implements IQueryHandler<GetMovieDetailQuery>
{
  constructor(
    @Inject('MOVIE_REPOSITORY')
    readonly movieRepository: Repository<Movie>,
  ) {}

  async execute(query: GetMovieDetailQuery): Promise<any> {
    const { movie_id } = query;
  }
}

// NOT DONE
