import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Language } from './entities';

@Injectable()
export class LanguageService {
  constructor(
    @Inject('LANGUAGE_REPOSITORY')
    private languageRepository: Repository<Language>,
  ) {}

  async findAll(): Promise<Language[]> {
    return this.languageRepository.find();
  }

  async findById(language_id: number): Promise<Language> {
    return this.languageRepository.findOneBy({ language_id });
  }
}
