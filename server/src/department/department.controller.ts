import { Controller, Get, Body, Param } from '@nestjs/common';
import { DepartmentService } from './department.service';
// import { Country } from './country.entity';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.departmentService.findById(id);
  }
}
