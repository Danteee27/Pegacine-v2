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
    const queryBuilder = this.movieCastRepository
      .createQueryBuilder('movie_cast')
      .leftJoinAndSelect('movie_cast.person', 'person')
      .where('movie_cast.movie_id = :movie_id', { movie_id })
      .orderBy('movie_cast.cast_order', 'ASC');
    return queryBuilder.getMany();
  }
}
