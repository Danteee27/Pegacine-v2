import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MovieKeywords } from './entities';

@Injectable()
export class MovieKeywordsService {
  constructor(
    @Inject('MOVIEKEYWORDS_REPOSITORY')
    private movieKeywordsRepository: Repository<MovieKeywords>,
  ) {}

  async findAll(): Promise<MovieKeywords[]> {
    return this.movieKeywordsRepository.find();
  }

  // async findById(keyword_id: number): Promise<MovieKeywords> {
  //   return this.movieKeywordsRepository.findOneBy({ keyword_id });
  // }
}
