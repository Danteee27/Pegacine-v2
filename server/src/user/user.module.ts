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
import { MovieModule } from 'src/movie/movie.module';
import { HttpModule } from '@nestjs/axios';
import { UserTransactionEntityProviders } from './transaction.provider';

@Module({
  imports: [
    DatabaseModule,
    CqrsModule,
    HttpModule,
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
    ...MovieProviders,
    ...ProfileEntityProviders,
    ...ProfileWatchingProviders,
    ...UserTransactionEntityProviders,
  ],
})
export class UserEntityModule {}
