import { DataSource } from 'typeorm';
import { MovieCast } from './entities';

export const MovieCastProviders = [
  {
    provide: 'MOVIECAST_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(MovieCast),
    inject: ['DATA_SOURCE'],
  },
];
