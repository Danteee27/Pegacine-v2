import { DataSource } from 'typeorm';
import { UserEntity } from './entities';

export const UserEntityProviders = [
  {
    provide: 'UserEntity_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: ['DATA_SOURCE'],
  },
];
