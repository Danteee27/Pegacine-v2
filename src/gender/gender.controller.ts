import { Controller, Get, Body, Param } from '@nestjs/common';
import { GenderService } from './gender.service';

@Controller('gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @Get()
  findAll() {
    return this.genderService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.genderService.findById(id);
  }
}
