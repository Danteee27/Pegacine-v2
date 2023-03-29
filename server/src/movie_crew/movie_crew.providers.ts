import { DataSource } from 'typeorm';
import { MovieCrew } from './entities';

export const MovieCrewProviders = [
  {
    provide: 'MOVIECREW_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(MovieCrew),
    inject: ['DATA_SOURCE'],
  },
];
