import { ProfileEntity } from 'src/user/entities/profile.entity';
import { DataSource } from 'typeorm';

export const ProfileEntityProviders = [
  {
    provide: 'ProfileEntity_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProfileEntity),
    inject: ['DATA_SOURCE'],
  },
];
