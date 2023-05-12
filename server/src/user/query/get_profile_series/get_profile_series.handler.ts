import { BadRequestException, Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProfileEntity } from 'src/user/entities/profile.entity';
import { Repository } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { GetProfileSeriesQuery } from './get_profile_series.query';

@QueryHandler(GetProfileSeriesQuery)
export class GetProfileSeriesQueryHandler
  implements IQueryHandler<GetProfileSeriesQuery>
{
  constructor(
    @Inject('ProfileEntity_REPOSITORY')
    private readonly profileEntityRepository: Repository<ProfileEntity>,
  ) {}

  async execute(query: GetProfileSeriesQuery) {
    const { profile_id } = query;

    const profile = await this.profileEntityRepository.findOne({
      where: { profile_id },
      relations: ['MySeries'],
    });

    if (!profile) {
      throw new BadRequestException('Profile not found');
    }

    return profile;
  }
}
