import { DataSource } from 'typeorm';
import { MovieCompany } from './entities';

export const MovieCompanyProviders = [
  {
    provide: 'MOVIECOMPANY_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MovieCompany),
    inject: ['DATA_SOURCE'],
  },
];
