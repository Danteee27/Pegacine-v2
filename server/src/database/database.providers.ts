import { join } from 'path';
import { DataSource } from 'typeorm';
import { Country } from 'src/country/entities';
import { Department } from 'src/department/entities';
import { Gender } from 'src/gender/entities';
import { Genre } from 'src/genre/entities';
import { Keyword } from 'src/keyword/entities';
import { Language } from 'src/language/entities';
import { LanguageRole } from 'src/language_role/entities';
import { Movie } from 'src/movie/entities';
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'ducanh123!@#',
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
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
