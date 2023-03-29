import { DataSource } from 'typeorm';
import { MovieKeywords } from './entities';

export const MovieKeywordsProviders = [
  {
    provide: 'MOVIEKEYWORDS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MovieKeywords),
    inject: ['DATA_SOURCE'],
  },
];
