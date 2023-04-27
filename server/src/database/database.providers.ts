import { ProfileEntity } from './../user/entities/profile.entity';
import { join } from 'path';
import { DataSource } from 'typeorm';
import 'reflect-metadata';
import { Country } from 'src/country/entities';
import { Department } from 'src/department/entities';
import { Gender } from 'src/gender/entities';
import { Genre } from 'src/genre/entities';
import { Keyword } from 'src/keyword/entities';
import { Language } from 'src/language/entities';
import { LanguageRole } from 'src/language_role/entities';
import { Movie } from 'src/movie/entities';
import { MovieCast } from 'src/movie_cast/entities';
import { MovieGenres } from 'src/movie_genres/entities';
import { MovieKeywords } from 'src/movie_keywords/entities';
import { MovieLanguages } from 'src/movie_languages/entities';
import { Person } from 'src/person/entities';
import { ProductionCompany } from 'src/production_company/entities';
import { ProductionCountry } from 'src/production_country/entities';
import { MovieCrew } from 'src/movie_crew/entities';
import { MovieCompany } from 'src/movie_company/entities';
import { UserEntity } from 'src/user/entities';
import { ProfileWatchingMovies } from 'src/user/entities/profile-watching.entity';
import { UserTransactionEntity } from 'src/user/entities/transaction.entity';
// import { User } from 'src/user/entities';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        // password: 'ducanh123!@#',
        password: 'root',
        database: 'movies',
        entities: [
          Country,
          Department,
          Gender,
          Genre,
          Keyword,
          Language,
          LanguageRole,
          Movie,
          MovieCast,
          MovieGenres,
          MovieKeywords,
          MovieLanguages,
          Person,
          ProductionCompany,
          ProductionCountry,
          MovieCrew,
          MovieCompany,
          UserEntity,
          ProfileEntity,
          ProfileWatchingMovies,
          UserTransactionEntity,
        ],
        synchronize: true,
        logging: ['error'],
      });

      return dataSource.initialize();
    },
  },
];
