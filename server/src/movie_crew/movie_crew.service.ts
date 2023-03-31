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

  async findById(movie_id: number): Promise<MovieCrew> {
    return this.movieCrewRepository.findOne({
      where: { movie_id },
      relations: ['person'],
    });
  }

  async findByMovieId(movie_id: number): Promise<MovieCrew[]> {
    const queryBuilder =
      this.movieCrewRepository.createQueryBuilder('movie_crew');
    queryBuilder.where('movie_crew.movie_id = :movie_id', { movie_id });
    queryBuilder.innerJoinAndSelect('movie_crew.person', 'person');
    return queryBuilder.getMany();
  }
}
