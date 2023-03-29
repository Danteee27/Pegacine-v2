import { DataSource } from 'typeorm';
import { MovieLanguages } from './entities';

export const MovieLanguagesProviders = [
  {
    provide: 'MOVIELANGUAGES_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MovieLanguages),
    inject: ['DATA_SOURCE'],
  },
];
