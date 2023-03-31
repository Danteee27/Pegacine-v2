import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Body, Param, Post, Delete } from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from './entities';

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

  @Post()
  create(@Body() person: Person) {
    return this.personService.create(person);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.personService.delete(id);
  }
}
