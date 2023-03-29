import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MovieCompany } from './entities';

@Injectable()
export class MovieCompanyService {
  constructor(
    @Inject('MOVIECOMPANY_REPOSITORY')
    private movieCompanyRepository: Repository<MovieCompany>,
  ) {}

  async findAll(): Promise<MovieCompany[]> {
    return this.movieCompanyRepository.find();
  }

  async findById(movie_id: number): Promise<MovieCompany[]> {
    return this.movieCompanyRepository.findBy({ movie_id });
  }
}
