import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { GenderController } from './gender.controller';
import { GenderProviders } from './gender.providers';
import { GenderService } from './gender.service';

@Module({
  imports: [DatabaseModule],
  controllers: [GenderController],
  providers: [...GenderProviders, GenderService],
})
export class GenderModule {}
