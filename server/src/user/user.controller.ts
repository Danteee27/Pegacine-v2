import { UpdateProfileDto } from './dtos/update_profile.dto';
import { UpdateProfileCommand } from './commands/update_profile/update_profile.command';
import { CreateProfileDto } from 'src/user/dtos/create_profile.dto';
import { LoginCommand } from './commands/login/login.command';
import { LoginDto } from './dtos/login.dto';
import {
  Controller,
  Get,
  Body,
  Param,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { RegisterCommand } from './commands/register/register.command';
import { RegisterDto } from './dtos/register.dto';
import { CreateProfileCommand } from './commands/create_profile/create_profile.command';
import { DeleteProfileDto } from './dtos/delete_profile.dto';
import { DeleteProfileCommand } from './commands/delete_profile/delete_profile.command';

@ApiTags('user')
@Controller('user')
export class UserEntityController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @Get()
  findAll() {}

  @Get(':id')
  findById(@Param('id') id: number) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.commandBus.execute(new RegisterCommand(dto));
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.commandBus.execute(new LoginCommand(dto));
  }

  @Post('profile')
  createProfile(@Body() dto: CreateProfileDto) {
    return this.commandBus.execute(new CreateProfileCommand(dto));
  }

  @Delete('profile')
  deleteProfile(@Body() dto: DeleteProfileDto) {
    return this.commandBus.execute(new DeleteProfileCommand(dto));
  }

  @Patch('profile')
  updateProfile(@Body() dto: UpdateProfileDto) {
    return this.commandBus.execute(new UpdateProfileCommand(dto));
  }
}
