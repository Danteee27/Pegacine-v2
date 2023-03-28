import { DataSource } from 'typeorm';
import { LanguageRole } from './entities';

export const LanguageRoleProviders = [
  {
    provide: 'LANGUAGEROLE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(LanguageRole),
    inject: ['DATA_SOURCE'],
  },
];
