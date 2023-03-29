import { Controller, Get, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { KeywordService } from './keyword.service';

@ApiTags('keyword')
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
