import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Genre } from './entities';

@Injectable()
export class GenreService {
  constructor(
    @Inject('GENRE_REPOSITORY')
    private genreRepository: Repository<Genre>,
  ) {}

  async findAll(): Promise<Genre[]> {
    return this.genreRepository.find();
  }

  async findById(genre_id: number): Promise<Genre> {
    return this.genreRepository.findOneBy({ genre_id });
  }
}
