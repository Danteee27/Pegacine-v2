import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  Query,
  ForbiddenException,
  Inject,
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
import { GetProfileWatchingQuery } from './query/get_profile_watching/get_profile_watching.query';
import { AddProfileWatchingMovieCommand } from './commands/profile/add_profile_watching_movie/add_profile_watching_movie.command';
import { DeleteProfileMyListMovieCommandHandler } from './commands/profile/delete_profile_mylist_movie/delete_profile_mylist_movie.handler';
import { DeleteProfileMyListMovieCommand } from './commands/profile/delete_profile_mylist_movie/delete_profile_mylist_movie.command';
import { DeleteProfileWatchingMovieCommand } from './commands/profile/delete_profile_watching_movie/delete_profile_watching_movie.command';
import { GetProfileWatchedQuery } from './query/get_profile_watched/get_profile_watched.query';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import axios from 'axios';
import { GetTransactionsDto } from './query/get_transactions/get_transactions.dto';
import { GetTransactionsQuery } from './query/get_transactions/get_transactions.query';
import { CheckTransactionDto } from './commands/user/check-transaction/check-transaction.dto';
import { CheckTransactionCommand } from './commands/user/check-transaction/check-transaction.command';
import { Repository } from 'typeorm';
import { UserTransactionEntity } from './entities/transaction.entity';
import { OkResponse } from 'libs/models/responses';
import { UserEntity } from './entities';
@ApiTags('user')
@Controller('user')
export class UserEntityController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
    @Inject('UserEntity_REPOSITORY')
    readonly userRepositoy: Repository<UserEntity>,
    @Inject('TRANSACTION_REPOSITORY')
    readonly transactionRepository: Repository<UserTransactionEntity>,
  ) {}

  @Get('get_all_users')
  async getAllUsers() {
    return await this.userRepositoy.find();
  }
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

  @Post('profile/my_list')
  addMyListMovie(
    @Query('profile_id') profile_id: number,
    @Query('movie_id') movie_id: number,
  ) {
    return this.commandBus.execute(
      new AddProfileMyListMovieCommand(profile_id, movie_id),
    );
  }

  @Delete('profiles/my_list')
  deleteMyListMovie(
    @Query('profile_id') profile_id: number,
    @Query('movie_id') movie_id: number,
  ) {
    return this.commandBus.execute(
      new DeleteProfileMyListMovieCommand(profile_id, movie_id),
    );
  }

  @Get('profiles/watching/')
  FindWatchingMovies(
    @Query('profile_id') profile_id: number,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.queryBus.execute(
      new GetProfileWatchingQuery(profile_id, page, pageSize),
    );
  }

  @Post('profiles/watching')
  createProfileWatchingMovie(
    @Query('profile_id') profile_id: number,
    @Query('movie_id') movie_id: number,
    @Query('stoppedAt') stoppedAt: number,
  ) {
    return this.commandBus.execute(
      new AddProfileWatchingMovieCommand(profile_id, movie_id, stoppedAt),
    );
  }

  @Delete('profiles/watching')
  deleteProfileWatchingMovie(
    @Query('profile_id') profile_id: number,
    @Query('movie_id') movie_id: number,
  ) {
    return this.commandBus.execute(
      new DeleteProfileWatchingMovieCommand(profile_id, movie_id),
    );
  }

  @Get('profiles/watched')
  getWatchedMovie(
    @Query('profile_id') profile_id: number,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.queryBus.execute(
      new GetProfileWatchedQuery(profile_id, page, pageSize),
    );
  }

  @Post('profiles/series')
  addSeries(
    @Query('user_id') user_id: number,
    @Query('movie_id') movie_id: number,
  ) {}

  @Get('profiles/:user_id')
  findProfileById(@Param('user_id') id: number) {
    return this.queryBus.execute(new GetProfilesQuery(id));
  }

  @Get('transaction')
  async getTransactions() {
    return await this.transactionRepository.find();
  }

  @Post('transaction')
  createTransaction(@Body() dto: GetTransactionsDto) {
    return this.queryBus.execute(new GetTransactionsQuery(dto));
  }

  @Post('check_transaction/:user_id')
  checkTransaction(
    @Param('user_id') user_id: number,
    @Body() dto: CheckTransactionDto,
  ) {
    return this.commandBus.execute(new CheckTransactionCommand(user_id, dto));
  }
}
