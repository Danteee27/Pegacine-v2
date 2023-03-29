import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MovieCrewController } from './movie_crew.controller';
import { MovieCrewProviders } from './movie_crew.providers';
import { MovieCrewService } from './movie_crew.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MovieCrewController],
  providers: [...MovieCrewProviders, MovieCrewService],
})
export class MovieCrewModule {}
