import { DataSource } from 'typeorm';
import { ProductionCountry } from './entities';

export const ProductionCountryProviders = [
  {
    provide: 'PRODUCTIONCOUNTRY_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProductionCountry),
    inject: ['DATA_SOURCE'],
  },
];
