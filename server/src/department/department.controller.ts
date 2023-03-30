import { Controller, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'libs/guards/clientService.guard';
import { DepartmentService } from './department.service';
// import { Country } from './country.entity';

@ApiTags('department')
@Controller('department')
@UseGuards(AuthGuard)
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.departmentService.findById(id);
  }
}
