import { DataSource } from 'typeorm';
import { Department } from './entities';

export const DepartmentProviders = [
  {
    provide: 'DEPARTMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Department),
    inject: ['DATA_SOURCE'],
  },
];
