import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs/dist';
import { DatabaseModule } from '../database/database.module';
import { MovieController } from './movie.controller';
import { MovieProviders } from './movie.providers';
import { QueryHandlers } from './queries';

@Module({
  imports: [DatabaseModule, CqrsModule, AuthModule],
  controllers: [MovieController],
  providers: [...MovieProviders, ...QueryHandlers],
})
export class MovieModule {}
