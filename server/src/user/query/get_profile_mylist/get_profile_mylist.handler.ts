import { IQueryHandler } from '@nestjs/cqrs';
import { GetProfileMyListQuery } from './get_profile_mylist.query';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProfileEntity } from 'src/user/entities/profile.entity';
import { paginate } from 'nestjs-typeorm-paginate';

export class GetProfileMyListQueryHandler
  implements IQueryHandler<GetProfileMyListQuery>
{
  constructor(
    @Inject('ProfileEntity_REPOSITORY')
    public readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async execute(query: GetProfileMyListQuery) {
    const { profile_id, page, pageSize } = query;

    const queryBuilder = this.profileRepository.createQueryBuilder('profiles');
    queryBuilder.innerJoinAndSelect('profiles.MyListMovies', 'MyListMovies');
    queryBuilder.where('profiles.profile_id = :profile_id', { profile_id });

    return paginate(queryBuilder, { page: page, limit: pageSize });
  }
}
