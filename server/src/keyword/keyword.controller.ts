import { Controller, Get, Body, Param } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { KeywordService } from './keyword.service';

@ApiTags('keyword')
@Controller('keyword')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {}

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 30) {
    return this.keywordService.findAll({
      page,
      limit,
      route: 'http://localhost:3000/keyword',
    });
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.keywordService.findById(id);
  }
}
