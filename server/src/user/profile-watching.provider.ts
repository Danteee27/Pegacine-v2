import { DataSource } from 'typeorm';
import { ProfileWatchingMovies } from './entities/profile-watching.entity';

export const ProfileWatchingProviders = [
  {
    provide: 'ProfileWatchingMovies_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProfileWatchingMovies),
    inject: ['DATA_SOURCE'],
  },
];
