import { DataSource } from 'typeorm';
import { Genre } from './entities';

export const GenreProviders = [
  {
    provide: 'GENRE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Genre),
    inject: ['DATA_SOURCE'],
  },
];
