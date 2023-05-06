import { DataSource } from 'typeorm';
import { Series } from './entities/series.entity';

export const SeriesProviders = [
  {
    provide: 'SERIES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Series),
    inject: ['DATA_SOURCE'],
  },
];
