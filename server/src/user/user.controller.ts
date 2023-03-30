import { Controller, Get, Body, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { RegisterCommand } from './commands/register/register.command';
import { RegisterDto } from './dtos/register.dto';

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
}
