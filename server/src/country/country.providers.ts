import { DataSource } from 'typeorm';
import { Country } from './entities';

export const CountryProviders = [
  {
    provide: 'COUNTRY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Country),
    inject: ['DATA_SOURCE'],
  },
];
