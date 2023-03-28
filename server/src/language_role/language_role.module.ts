import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { LanguageRoleController } from './language_role.controller';
import { LanguageRoleProviders } from './language_role.providers';
import { LanguageRoleService } from './language_role.service';

@Module({
  imports: [DatabaseModule],
  controllers: [LanguageRoleController],
  providers: [...LanguageRoleProviders, LanguageRoleService],
})
export class LanguageRoleModule {}
