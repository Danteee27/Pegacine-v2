import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MovieGenresController } from './movie_genres.controller';
import { MovieGenresProviders } from './movie_genres.providers';
import { MovieGenresService } from './movie_genres.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MovieGenresController],
  providers: [...MovieGenresProviders, MovieGenresService],
})
export class MovieGenresModule {}
