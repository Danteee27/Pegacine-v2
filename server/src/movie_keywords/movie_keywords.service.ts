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

  async findById(keyword_id: number): Promise<MovieKeywords> {
    return this.movieKeywordsRepository.findOne({
      where: { keyword_id },
      relations: ['keyword'],
    });
  }

  async findByMovieId(movie_id: number): Promise<MovieKeywords[]> {
    const queryBuilder =
      this.movieKeywordsRepository.createQueryBuilder('movie_keywords');
    queryBuilder.where('movie_keywords.movie_id = :movie_id', { movie_id });
    queryBuilder.innerJoinAndSelect('movie_keywords.keyword', 'keyword');
    return queryBuilder.getMany();
  }
}
