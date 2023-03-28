import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Keyword } from './entities';

@Injectable()
export class KeywordService {
  constructor(
    @Inject('KEYWORD_REPOSITORY')
    private genreRepository: Repository<Keyword>,
  ) {}

  async findAll(): Promise<Keyword[]> {
    return this.genreRepository.find();
  }

  async findById(keyword_id: number): Promise<Keyword> {
    return this.genreRepository.findOneBy({ keyword_id });
  }
}
