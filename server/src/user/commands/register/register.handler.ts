import { OkResponse } from './../../../../libs/models/responses/ok.response';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterCommand } from './register.command';
import { UserEntity } from 'src/user/entities';
import { BadRequestException, Inject } from '@nestjs/common';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler
  implements ICommandHandler<RegisterCommand>
{
  constructor(
    @Inject('UserEntity_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: RegisterCommand) {
    const email = command.dto.email.trim().toLowerCase();
    const userExist = await this.userRepository.exist({ where: { email } });
    if (userExist) {
      throw new BadRequestException('User already exists');
    }

    const { password, firstName, lastName, dob, phoneNumber } = command.dto;

    const newUser = await this.userRepository.create({
      email,
      username: email,
      password,
    });

    await newUser.save();

    const token = this.jwtService.sign(
      {
        id: newUser.id,
      },
      { secret: newUser.password, expiresIn: '1d' },
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
    });
  }
}
