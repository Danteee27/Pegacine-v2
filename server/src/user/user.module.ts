import { CommandHandlers } from './commands/index';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '../database/database.module';
import { UserEntityController } from './user.controller';
import { UserEntityProviders } from './user.providers';
import { JwtModule } from '@nestjs/jwt';
import { ProfileEntityProviders } from './profile.providers';
import { QueryHandlers } from './query';
import { MovieProviders } from 'src/movie/movie.providers';
import { ProfileWatchingProviders } from './profile-watching.provider';

@Module({
  imports: [
    DatabaseModule,
    CqrsModule,
    JwtModule.register({
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [UserEntityController],
  providers: [
    ...UserEntityProviders,
    ...CommandHandlers,
    ...QueryHandlers,
    ...ProfileEntityProviders,
    ...MovieProviders,
    ...ProfileWatchingProviders,
  ],
})
export class UserEntityModule {}
