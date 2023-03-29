import { DataSource } from 'typeorm';
import { ProductionCompany } from './entities';

export const ProductionCompanyProviders = [
  {
    provide: 'PRODUCTIONCOMPANY_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProductionCompany),
    inject: ['DATA_SOURCE'],
  },
];
