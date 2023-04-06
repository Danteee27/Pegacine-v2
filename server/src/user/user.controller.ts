import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { AddProfileFavoriteMovieCommand } from './commands/profile/add_profile_favorite_movie/add_profile_favorite_movie.command';
import { AddProfileMyListMovieCommand } from './commands/profile/add_profile_mylist_movie/add_profile_mylist_movie.command';
import { CreateProfileCommand } from './commands/profile/create_profile/create_profile.command';
import { CreateProfileDto } from './commands/profile/create_profile/create_profile.dto';
import { DeleteProfileCommand } from './commands/profile/delete_profile/delete_profile.command';
import { DeleteProfileDto } from './commands/profile/delete_profile/delete_profile.dto';
import { DeleteProfileFavoriteMovieCommand } from './commands/profile/delete_profile_favorite_movie/delete_profile_favorite_movie.command';
import { UpdateProfileCommand } from './commands/profile/update_profile/update_profile.command';
import { UpdateProfileDto } from './commands/profile/update_profile/update_profile.dto';
import { LoginCommand } from './commands/user/login/login.command';
import { LoginDto } from './commands/user/login/login.dto';
import { RegisterCommand } from './commands/user/register/register.command';
import { RegisterDto } from './commands/user/register/register.dto';
import { GetProfileFavoriteQuery } from './query/get_profile_favorite/get_profile_favorite.query';
import { GetProfileMyListQuery } from './query/get_profile_mylist/get_profile_mylist.query';
import { GetProfilesQuery } from './query/get_profiles/get_profiles.query';

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
      new AddProfileFavoriteMovieCommand(profile_id, movie_id),
    );
  }

  @Delete('profile/favorite')
  deleteFavoriteMovie(
    @Query('profile_id') profile_id: number,
    @Query('movie_id') movie_id: number,
  ) {
    return this.commandBus.execute(
      new DeleteProfileFavoriteMovieCommand(profile_id, movie_id),
    );
  }

  @Post('profile/my_list')
  addMyListMovie(
    @Query('profile_id') profile_id: number,
    @Query('movie_id') movie_id: number,
  ) {
    return this.commandBus.execute(
      new AddProfileMyListMovieCommand(profile_id, movie_id),
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
