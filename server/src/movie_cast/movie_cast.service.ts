import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MovieCast } from './entities';

@Injectable()
export class MovieCastService {
  constructor(
    @Inject('MOVIECAST_REPOSITORY')
    private movieCastRepository: Repository<MovieCast>,
  ) {}

  async findAll(): Promise<MovieCast[]> {
    return this.movieCastRepository.find();
  }

  async findByMovieID(movie_id: number): Promise<MovieCast[]> {
    return this.movieCastRepository.findBy({ movie_id });
  }
}
