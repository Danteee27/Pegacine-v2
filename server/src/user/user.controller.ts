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
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { RegisterCommand } from './commands/register/register.command';
import { RegisterDto } from './dtos/register.dto';
import { CreateProfileCommand } from './commands/create_profile/create_profile.command';
import { DeleteProfileDto } from './dtos/delete_profile.dto';
import { DeleteProfileCommand } from './commands/delete_profile/delete_profile.command';
import { GetProfilesQuery } from './query/get_profiles/get_profiles.query';
import { GetProfileFavoriteQuery } from './query/get_profile_favorite/get_profile_favorite.query';
import { ProfileFavoriteMovieCommand } from './commands/profile_favorite_movie/profile_favorite_movie.command';
import { GetProfileMyListQuery } from './query/get_profile_mylist/get_profile_mylist.query';
import { ProfileMyListMovieCommand } from './commands/profile_mylist_movie/profile_mylist_movie.command';

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

  @Post('profile/favorite')
  addFavoriteMovie(
    @Query('profile_id') profile_id: number,
    @Query('movie_id') movie_id: number,
  ) {
    return this.commandBus.execute(
      new ProfileFavoriteMovieCommand(profile_id, movie_id),
    );
  }

  @Post('profile/my_list')
  addMyListMovie(
    @Query('profile_id') profile_id: number,
    @Query('movie_id') movie_id: number,
  ) {
    return this.commandBus.execute(
      new ProfileMyListMovieCommand(profile_id, movie_id),
    );
  }

  @Get('profiles/favorite/')
  findFavoriteMovies(
    @Query('profile_id') profile_id: number,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.queryBus.execute(
      new GetProfileFavoriteQuery(profile_id, page, pageSize),
    );
  }

  @Get('profiles/my_list/')
  FindMyListMovies(
    @Query('profile_id') profile_id: number,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.queryBus.execute(
      new GetProfileMyListQuery(profile_id, page, pageSize),
    );
  }

  @Get('profiles/:user_id')
  findProfileById(@Param('user_id') id: number) {
    return this.queryBus.execute(new GetProfilesQuery(id));
  }
}
