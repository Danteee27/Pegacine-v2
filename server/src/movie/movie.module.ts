import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs/dist';
import { DatabaseModule } from '../database/database.module';
import { MovieController } from './movie.controller';
import { MovieProviders } from './movie.providers';
import { MovieService } from './movie.service';
import { QueryHandlers } from './queries';

@Module({
  imports: [DatabaseModule, CqrsModule],
  controllers: [MovieController],
  providers: [...MovieProviders, MovieService, ...QueryHandlers],
})
export class MovieModule {}
