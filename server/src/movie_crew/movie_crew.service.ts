import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MovieCrew } from './entities';

@Injectable()
export class MovieCrewService {
  constructor(
    @Inject('MOVIECREW_REPOSITORY')
    private movieCrewRepository: Repository<MovieCrew>,
  ) {}

  async findAll(): Promise<MovieCrew[]> {
    return this.movieCrewRepository.find();
  }

  // async findById(movie_id: number): Promise<MovieCrew> {
  //   return this.movieCrewRepository.findOneBy({ movie_id });
  // }
}
