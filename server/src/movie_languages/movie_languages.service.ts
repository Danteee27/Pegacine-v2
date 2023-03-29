import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MovieLanguages } from './entities';

@Injectable()
export class MovieLanguagesService {
  constructor(
    @Inject('MOVIELANGUAGES_REPOSITORY')
    private movieLanguagesRepository: Repository<MovieLanguages>,
  ) {}

  async findAll(): Promise<MovieLanguages[]> {
    return this.movieLanguagesRepository.find();
  }

  // async findById(movie_id: number): Promise<MovieLanguages> {
  //   return this.movieLanguagesRepository.findOneBy({ movie_id });
  // }
}
