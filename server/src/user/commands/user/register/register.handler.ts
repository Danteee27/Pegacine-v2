import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterCommand } from './register.command';
import { UserEntity } from 'src/user/entities';
import { BadRequestException, Inject } from '@nestjs/common';
import { OkResponse } from 'libs/models/responses';
import { ProfileEntity } from 'src/user/entities/profile.entity';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler
  implements ICommandHandler<RegisterCommand>
{
  constructor(
    @Inject('UserEntity_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>,
    @Inject('ProfileEntity_REPOSITORY')
    private readonly profileRepository: Repository<ProfileEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: RegisterCommand) {
    const email = command.dto.email.trim().toLowerCase();
    const userExist = await this.userRepository.exist({ where: { email } });
    if (userExist) {
      throw new BadRequestException('User already exists');
    }

    const { password, phoneNumber } = command.dto;

    const newUser = this.userRepository.create({
      email,
      username: email,
      password,
      phoneNumber,
    });
    await newUser.save();

    const newProfile = this.profileRepository.create({
      profile_id: newUser.id,
      user_id: newUser.id,
      name: newUser.username,
    });
    await newProfile.save();
    const token = this.jwtService.sign(
      {
        id: newUser.id,
      },
      { secret: newUser.password, expiresIn: '30d' },
    );

    const refreshToken = this.jwtService.sign(
      { id: newUser.id },
      { secret: token, expiresIn: '30d' },
    );

    return new OkResponse({
      jwt: {
        token,
        refreshToken,
      },
      user: newUser,
      profile: newProfile,
    });
  }
}
