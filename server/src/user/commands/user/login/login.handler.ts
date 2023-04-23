import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { UserEntity } from 'src/user/entities';
import { BadRequestException, Inject } from '@nestjs/common';
import { OkResponse } from 'libs/models/responses';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  constructor(
    @Inject('UserEntity_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: LoginCommand) {
    const email = command.dto.email.trim().toLowerCase();
    const userToAttempt = await this.userRepository.findOne({
      where: { email },
    });

    if (!userToAttempt) {
      throw new BadRequestException('User does not exist');
    }

    const isMatch = await userToAttempt.checkPassword(command.dto.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid Email or Password');
    }

    const token = this.jwtService.sign(
      {
        id: userToAttempt.id,
      },
      { secret: userToAttempt.password, expiresIn: '1d' },
    );

    const refreshToken = this.jwtService.sign(
      { id: userToAttempt.id },
      { secret: token, expiresIn: '30d' },
    );

    return new OkResponse({
      jwt: {
        token,
        refreshToken,
      },
      user: userToAttempt,
    });
  }
}
