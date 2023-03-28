import { DataSource } from 'typeorm';
import { Gender } from './entities';

export const GenderProviders = [
  {
    provide: 'GENDER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Gender),
    inject: ['DATA_SOURCE'],
  },
];
