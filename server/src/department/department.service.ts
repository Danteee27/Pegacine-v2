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

  async create(department: Department): Promise<Department> {
    return this.departmentRepository.save(department);
  }

  async delete(department_id: number): Promise<void> {
    await this.departmentRepository.delete(department_id);
  }
}
