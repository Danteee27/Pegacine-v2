import { DataSource } from 'typeorm';
import { Series } from './entities/series.entity';

export const MovieProviders = [
  {
    provide: 'SERIES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Series),
    inject: ['DATA_SOURCE'],
  },
];
