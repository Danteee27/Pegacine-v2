import { Repository } from 'typeorm';
import { CreateProfileCommand } from './create_profile.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserEntity } from 'src/user/entities';
import { ProfileEntity } from 'src/user/entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';
import { OkResponse } from 'libs/models/responses';

@CommandHandler(CreateProfileCommand)
export class CreateProfileCommandHandler
  implements ICommandHandler<CreateProfileCommand>
{
  constructor(
    @Inject('ProfileEntity_REPOSITORY')
    readonly profileEntityRepository: Repository<ProfileEntity>,
  ) {}

  async execute(command: CreateProfileCommand) {
    const { user_id, name } = command.dto;
    const profile = this.profileEntityRepository.create({
      user_id,
      name,
    });

    await profile.save();

    return new OkResponse(profile);
  }
}
