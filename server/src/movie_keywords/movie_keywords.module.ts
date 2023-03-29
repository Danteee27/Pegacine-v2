import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MovieKeywordsController } from './movie_keywords.controller';
import { MovieKeywordsProviders } from './movie_keywords.providers';
import { MovieKeywordsService } from './movie_keywords.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MovieKeywordsController],
  providers: [...MovieKeywordsProviders, MovieKeywordsService],
})
export class MovieKeywordsModule {}
