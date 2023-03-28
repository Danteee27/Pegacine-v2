import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { KeywordController } from './keyword.controller';
import { KeywordProviders } from './keyword.providers';
import { KeywordService } from './keyword.service';

@Module({
  imports: [DatabaseModule],
  controllers: [KeywordController],
  providers: [...KeywordProviders, KeywordService],
})
export class KeywordModule {}
