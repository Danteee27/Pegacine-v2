import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from './entities';

@Injectable()
export class MovieService {
  constructor(
    @Inject('MOVIE_REPOSITORY')
    private movieRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async findById(movie_id: number): Promise<Movie> {
    return this.movieRepository.findOneBy({ movie_id });
  }
}
