import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LanguageRole } from './entities';

@Injectable()
export class LanguageRoleService {
  constructor(
    @Inject('LANGUAGEROLE_REPOSITORY')
    private languageRoleRepository: Repository<LanguageRole>,
  ) {}

  async findAll(): Promise<LanguageRole[]> {
    return this.languageRoleRepository.find();
  }

  async findById(role_id: number): Promise<LanguageRole> {
    return this.languageRoleRepository.findOneBy({ role_id });
  }
}
