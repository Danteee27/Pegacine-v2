import { Controller, Get, Body, Param } from '@nestjs/common';
import { LanguageRoleService } from './language_role.service';

@Controller('language_role')
export class LanguageRoleController {
  constructor(private readonly languageRoleService: LanguageRoleService) {}

  @Get()
  findAll() {
    return this.languageRoleService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.languageRoleService.findById(id);
  }
}
