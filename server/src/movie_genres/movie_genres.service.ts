import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MovieGenres } from './entities';

@Injectable()
export class MovieGenresService {
  constructor(
    @Inject('MOVIEGENRE_REPOSITORY')
    private genreRepository: Repository<MovieGenres>,
  ) {}

  async findAll(): Promise<MovieGenres[]> {
    return this.genreRepository.find();
  }

  // async findById(genre_id: number): Promise<MovieGenres> {
  //   return this.genreRepository.findOneBy({ genre_id });
  // }
}
