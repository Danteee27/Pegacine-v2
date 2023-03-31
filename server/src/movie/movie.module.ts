import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs/dist';
import { DatabaseModule } from '../database/database.module';
import { MovieController } from './movie.controller';
import { MovieProviders } from './movie.providers';
import { QueryHandlers } from './queries';
import { MovieGenresModule } from 'src/movie_genres/movie_genres.module';
import { MovieGenresProviders } from 'src/movie_genres/movie_genres.providers';

@Module({
  imports: [DatabaseModule, CqrsModule, AuthModule, MovieGenresModule],
  controllers: [MovieController],
  providers: [...MovieProviders, ...QueryHandlers, ...MovieGenresProviders],
})
export class MovieModule {}
