import { Controller, Get, Body, Param } from '@nestjs/common';
import { LanguageService } from './language.service';

@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Get()
  findAll() {
    return this.languageService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.languageService.findById(id);
  }
}
