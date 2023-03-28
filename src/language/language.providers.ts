import { DataSource } from 'typeorm';
import { Language } from './entities';

export const LanguageProviders = [
  {
    provide: 'LANGUAGE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Language),
    inject: ['DATA_SOURCE'],
  },
];
