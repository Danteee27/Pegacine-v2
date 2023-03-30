import { UpdateProfileCommand } from './update_profile.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProfileEntity } from 'src/user/entities/profile.entity';
import { OkResponse } from 'libs/models/responses';

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileCommandHandler
  implements ICommandHandler<UpdateProfileCommand>
{
  constructor(
    @Inject('ProfileEntity_REPOSITORY')
    readonly profileEntityRepository: Repository<ProfileEntity>,
  ) {}

  async execute(command: UpdateProfileCommand) {
    const { user_id, profile_id, name } = command.dto;

    const queryBuilder =
      this.profileEntityRepository.createQueryBuilder('profiles');
    queryBuilder.where({ user_id, profile_id });

    const profile = await queryBuilder.getOne();
    if (!profile) {
      throw new BadRequestException('Profile does not exist');
    }

    profile.name = name;
    await profile.save();

    return new OkResponse(profile);
  }
}
