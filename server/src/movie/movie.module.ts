import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs/dist';
import { DatabaseModule } from '../database/database.module';
import { MovieController } from './movie.controller';
import { MovieProviders } from './movie.providers';
import { QueryHandlers } from './queries';
import { MovieGenresModule } from 'src/movie_genres/movie_genres.module';
import { MovieGenresProviders } from 'src/movie_genres/movie_genres.providers';
import { MovieCastProviders } from 'src/movie_cast/movie_cast.providers';
import { ProductionCompanyProviders } from 'src/production_company/production_company.providers';
import { MovieLanguagesProviders } from 'src/movie_languages/movie_languages.providers';
import { MovieKeywordsProviders } from 'src/movie_keywords/movie_keywords.providers';
import { MovieCompanyProviders } from 'src/movie_company/movie_company.providers';
import { MovieCrewProviders } from 'src/movie_crew/movie_crew.providers';
import { ProductionCountryProviders } from 'src/production_country/production_country.providers';
import { ProfileEntityProviders } from 'src/user/profile.providers';
import { ProfileWatchingProviders } from 'src/user/profile-watching.provider';
import { GenreProviders } from 'src/genre/genre.providers';
import { PersonProviders } from 'src/person/person.providers';
import { CommandHandlers } from './commands';

@Module({
  imports: [DatabaseModule, CqrsModule, AuthModule],
  controllers: [MovieController],
  providers: [
    ...MovieProviders,
    ...QueryHandlers,
    ...CommandHandlers,
    ...MovieGenresProviders,
    ...MovieCastProviders,
    ...ProductionCountryProviders,
    ...MovieLanguagesProviders,
    ...MovieKeywordsProviders,
    ...MovieCompanyProviders,
    ...MovieCrewProviders,
    ...ProfileEntityProviders,
    ...ProfileWatchingProviders,
    ...GenreProviders,
    ...PersonProviders,
  ],
})
export class MovieModule {}
