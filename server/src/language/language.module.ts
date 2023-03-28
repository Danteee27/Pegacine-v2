import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { LanguageController } from './language.controller';
import { LanguageProviders } from './language.providers';
import { LanguageService } from './language.service';

@Module({
  imports: [DatabaseModule],
  controllers: [LanguageController],
  providers: [...LanguageProviders, LanguageService],
})
export class LanguageModule {}
