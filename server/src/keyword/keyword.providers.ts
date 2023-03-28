import { DataSource } from 'typeorm';
import { Keyword } from './entities';

export const KeywordProviders = [
  {
    provide: 'KEYWORD_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Keyword),
    inject: ['DATA_SOURCE'],
  },
];
