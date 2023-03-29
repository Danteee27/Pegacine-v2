import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PersonController } from './person.controller';
import { PersonProviders } from './person.providers';
import { PersonService } from './person.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PersonController],
  providers: [...PersonProviders, PersonService],
})
export class PersonModule {}
