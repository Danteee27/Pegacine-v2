import { Controller, Get, Body, Param } from '@nestjs/common';
import { KeywordService } from './keyword.service';

@Controller('keyword')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {}

  @Get()
  findAll() {
    return this.keywordService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.keywordService.findById(id);
  }
}
