import { Inject, BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OkResponse } from 'libs/models/responses';
import { ProfileEntity } from 'src/user/entities/profile.entity';
import { Repository } from 'typeorm';
import { DeleteProfileCommand } from './delete_profile.command';

@CommandHandler(DeleteProfileCommand)
export class DeleteProfileCommandHandler
  implements ICommandHandler<DeleteProfileCommand>
{
  constructor(
    @Inject('ProfileEntity_REPOSITORY')
    readonly profileEntityRepository: Repository<ProfileEntity>,
  ) {}

  async execute(command: DeleteProfileCommand) {
    const { user_id, profile_id } = command.dto;

    const queryBuilder =
      this.profileEntityRepository.createQueryBuilder('profiles');
    queryBuilder.where({ user_id, profile_id });

    const profile = await queryBuilder.getOne();
    if (!profile) {
      throw new BadRequestException('Profile does not exist');
    }

    queryBuilder.delete().execute();

    return new OkResponse();
  }
}
