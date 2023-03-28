import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Department } from './entities';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject('DEPARTMENT_REPOSITORY')
    private departmentRepository: Repository<Department>,
  ) {}

  async findAll(): Promise<Department[]> {
    return this.departmentRepository.find();
  }

  async findById(department_id: number): Promise<Department> {
    return this.departmentRepository.findOneBy({ department_id });
  }
}
