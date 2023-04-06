import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProfileWatchedQuery } from './get_profile_watched.query';
import { Repository } from 'typeorm';
import { ProfileEntity } from 'src/user/entities/profile.entity';
import { BadRequestException, Inject } from '@nestjs/common';
import { OkResponse } from 'libs/models/responses';
import { paginate } from 'nestjs-typeorm-paginate';

@QueryHandler(GetProfileWatchedQuery)
export class GetProfileWatchedQueryHandler
  implements IQueryHandler<GetProfileWatchedQuery>
{
  constructor(
    @Inject('ProfileEntity_REPOSITORY')
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async execute(query: GetProfileWatchedQuery): Promise<any> {
    const { profile_id, page, pageSize } = query;

    const queryBuilder = this.profileRepository.createQueryBuilder('profiles');
    queryBuilder.innerJoinAndSelect('profiles.WatchedMovies', 'WatchedMovies');
    queryBuilder.where('profiles.profile_id = :profile_id', { profile_id });

    return paginate(queryBuilder, { page, limit: pageSize });
  }
}
