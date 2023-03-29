import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MovieLanguagesController } from './movie_languages.controller';
import { MovieLanguagesProviders } from './movie_languages.providers';
import { MovieLanguagesService } from './movie_languages.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MovieLanguagesController],
  providers: [...MovieLanguagesProviders, MovieLanguagesService],
})
export class MovieLanguagesModule {}
