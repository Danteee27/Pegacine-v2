import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MovieGenres } from './entities';
import { OkResponse } from 'libs/models/responses';

@Injectable()
export class MovieGenresService {
  constructor(
    @Inject('MOVIEGENRE_REPOSITORY')
    private genreRepository: Repository<MovieGenres>,
  ) {}

  async findAll(): Promise<MovieGenres[]> {
    return this.genreRepository.find();
  }

  async findById(genre_id: number): Promise<MovieGenres> {
    return this.genreRepository.findOneBy({ genre_id });
  }

  async findByMovieId(movie_id: number): Promise<MovieGenres[]> {
    const queryBuilder =
      this.genreRepository.createQueryBuilder('movie_genres');
    queryBuilder.where('movie_genres.movie_id = :movie_id', { movie_id });
    queryBuilder.innerJoinAndSelect('movie_genres.genre', 'genre');
    return queryBuilder.getMany();
  }

  async create(movieGenre: MovieGenres) {
    const genre = this.genreRepository.create(movieGenre);
    genre.save();
    return genre;
  }

  async delete(movieGenre: MovieGenres) {
    const genre = await this.genreRepository.findOne({
      where: { movie_id: movieGenre.movie_id, genre_id: movieGenre.genre_id },
    });
    await genre.remove();
    await genre.save();
    return new OkResponse();
  }
}
