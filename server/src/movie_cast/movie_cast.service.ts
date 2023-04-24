import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MovieCast } from './entities';
import { Movie } from 'src/movie/entities';

@Injectable()
export class MovieCastService {
  constructor(
    @Inject('MOVIECAST_REPOSITORY')
    private movieCastRepository: Repository<MovieCast>,
    @Inject('MOVIE_REPOSITORY')
    private movieRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<MovieCast[]> {
    return this.movieCastRepository.find();
  }

  async findById(movie_id: number): Promise<MovieCast> {
    return this.movieCastRepository.findOne({
      where: { movie_id },
      relations: ['person'],
    });
  }

  async findByMovieID(movie_id: number): Promise<MovieCast[]> {
    const queryBuilder = this.movieCastRepository
      .createQueryBuilder('movie_cast')
      .leftJoinAndSelect('movie_cast.person', 'person')
      .where('movie_cast.movie_id = :movie_id', { movie_id })
      .orderBy('movie_cast.cast_order', 'ASC');
    return queryBuilder.getMany();
  }

  async create(movieCast: MovieCast) {
    const movie = await this.movieRepository.findOneBy({
      movie_id: movieCast.movie_id,
    });
    if (!movie) {
      throw new BadRequestException('Movie not found');
    }
    const cast = this.movieCastRepository.create(movieCast);
    cast.gender_id = 0;
    cast.save();

    return cast;
  }
}
