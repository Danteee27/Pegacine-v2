import {
  Controller,
  Get,
  Body,
  Param,
  UseGuards,
  Post,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'libs/guards/clientService.guard';
import { DepartmentService } from './department.service';
import { Department } from './entities';
// import { Country } from './country.entity';

@ApiTags('department')
@Controller('department')
// @UseGuards(AuthGuard)
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @Post()
  create(@Body() department: Department) {
    return this.departmentService.create(department);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.departmentService.delete(id);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.departmentService.findById(id);
  }
}
