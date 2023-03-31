import { Injectable, Inject, BadRequestException } from '@nestjs/common';
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
    const genre = await this.genreRepository.findOneBy({ genre_id });
    if (genre === null) {
      throw new BadRequestException('Genre does not exist');
    }

    return genre;
  }

  async create(genre: Genre): Promise<Genre> {
    return this.genreRepository.save(genre);
  }

  async delete(genre_id: number): Promise<void> {
    await this.genreRepository.delete(genre_id);
  }
}
