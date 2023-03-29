import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MovieCastController } from './movie_cast.controller';
import { MovieCastProviders } from './movie_cast.providers';
import { MovieCastService } from './movie_cast.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MovieCastController],
  providers: [...MovieCastProviders, MovieCastService],
})
export class MovieCastModule {}
