import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProfileEntity } from 'src/user/entities/profile.entity';
import { Repository } from 'typeorm';
import { GetProfilesQuery } from './get_profiles.query';

@QueryHandler(GetProfilesQuery)
export class GetProfilesQueryHandler implements IQueryHandler {
  constructor(
    @Inject('ProfileEntity_REPOSITORY')
    readonly profileEntityRepository: Repository<ProfileEntity>,
  ) {}
  async execute(query: GetProfilesQuery) {
    const { id } = query;

    return await this.profileEntityRepository.find({ where: { user_id: id } });
  }
}
