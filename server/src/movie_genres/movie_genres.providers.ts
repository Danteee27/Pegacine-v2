import { DataSource } from 'typeorm';
import { MovieGenres } from './entities';

export const MovieGenresProviders = [
  {
    provide: 'MOVIEGENRE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MovieGenres),
    inject: ['DATA_SOURCE'],
  },
];
