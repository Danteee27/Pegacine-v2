import { Module } from '@nestjs/common';
import { GenreProviders } from 'src/genre/genre.providers';
import { UserEntityProviders } from 'src/user/user.providers';
import { databaseProviders } from './database.providers';

@Module({
  providers: [...databaseProviders, ...UserEntityProviders],
  exports: [...databaseProviders, ...UserEntityProviders],
})
export class DatabaseModule {}
