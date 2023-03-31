import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Keyword } from './entities';
import {
  Pagination,
  paginate,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class KeywordService {
  constructor(
    @Inject('KEYWORD_REPOSITORY')
    private keywordRepository: Repository<Keyword>,
  ) {}

  async findAll(options: IPaginationOptions): Promise<Pagination<Keyword>> {
    const queryBuilder = this.keywordRepository.createQueryBuilder('keyword');

    return paginate<Keyword>(queryBuilder, options);
  }

  async findById(keyword_id: number): Promise<Keyword> {
    return this.keywordRepository.findOneBy({ keyword_id });
  }

  async create(keyword: Keyword): Promise<Keyword> {
    return this.keywordRepository.save(keyword);
  }

  async delete(keyword_id: number): Promise<void> {
    await this.keywordRepository.delete(keyword_id);
  }
}
