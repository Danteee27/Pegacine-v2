import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MovieController } from './movie.controller';
import { MovieProviders } from './movie.providers';
import { MovieService } from './movie.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MovieController],
  providers: [...MovieProviders, MovieService],
})
export class MovieModule {}
