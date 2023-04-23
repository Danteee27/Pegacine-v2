import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProfileWatchingQuery } from './get_profile_watching.query';
import { BadRequestException, Inject } from '@nestjs/common';
import { ProfileEntity } from 'src/user/entities/profile.entity';
import { Repository } from 'typeorm';
import { OkResponse } from 'libs/models/responses';
import { paginate } from 'nestjs-typeorm-paginate';
import { ProfileWatchingMovies } from 'src/user/entities/profile-watching.entity';

@QueryHandler(GetProfileWatchingQuery)
export class GetProfileWatchingQueryHandler
  implements IQueryHandler<GetProfileWatchingQuery>
{
  constructor(
    @Inject('ProfileWatchingMovies_REPOSITORY')
    private readonly profileWatchingRepository: Repository<ProfileWatchingMovies>,
  ) {}

  async execute(query: GetProfileWatchingQuery): Promise<any> {
    const { profile_id, page, pageSize } = query;

    const queryBuilder = this.profileWatchingRepository.createQueryBuilder(
      'profile_watching_movies',
    );
    queryBuilder.innerJoinAndSelect('profile_watching_movies.movie', 'movie');
    queryBuilder.where({ profile_id });

    return paginate(queryBuilder, { page: page, limit: pageSize });
  }
}
