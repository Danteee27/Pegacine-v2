import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProfileEntity } from 'src/user/entities/profile.entity';
import { Repository } from 'typeorm';
import { GetProfileFavoriteQuery } from './get_profile_favorite.query';

@QueryHandler(GetProfileFavoriteQuery)
export class GetProfileFavoriteQueryHandler
  implements IQueryHandler<GetProfileFavoriteQuery>
{
  constructor(
    @Inject('ProfileEntity_REPOSITORY')
    readonly profileEntityRepository: Repository<ProfileEntity>,
  ) {}

  async execute(query: GetProfileFavoriteQuery) {
    const { profile_id } = query;

    const queryBuilder =
      this.profileEntityRepository.createQueryBuilder('profiles');
    queryBuilder.innerJoinAndSelect(
      'profiles.FavoriteMovies',
      'FavoriteMovies',
    );
    queryBuilder.where('profiles.profile_id = :profile_id', { profile_id });

    return queryBuilder.getMany();
  }
}
