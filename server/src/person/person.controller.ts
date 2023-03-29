import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Body, Param } from '@nestjs/common';
import { PersonService } from './person.service';

@ApiTags('person')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.personService.findById(id);
  }
}
