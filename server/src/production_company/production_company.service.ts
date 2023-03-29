import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductionCompany } from './entities';

@Injectable()
export class ProductionCompanyService {
  constructor(
    @Inject('PRODUCTIONCOMPANY_REPOSITORY')
    private productionCompanyRepository: Repository<ProductionCompany>,
  ) {}

  async findAll(): Promise<ProductionCompany[]> {
    return this.productionCompanyRepository.find();
  }

  async findById(company_id: number): Promise<ProductionCompany> {
    return this.productionCompanyRepository.findOneBy({ company_id });
  }
}
