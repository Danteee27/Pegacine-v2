import { join } from 'path';
import { DataSource } from 'typeorm';
import { Country } from 'src/country/entities';
import { Department } from 'src/department/entities';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'ducanh123!@#',
        database: 'movies',
        entities: [Country, Department],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
