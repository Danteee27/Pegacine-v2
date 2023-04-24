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

  async findById(company_id: number): Promise<MovieCompany> {
    return this.movieCompanyRepository.findOne({
      where: { company_id },
    });
  }

  async findByMovieId(movie_id: number): Promise<MovieCompany[]> {
    const queryBuilder =
      this.movieCompanyRepository.createQueryBuilder('movie_company');
    queryBuilder.where('movie_company.movie_id = :movie_id', { movie_id });
    queryBuilder.innerJoinAndSelect('movie_company.company', 'company');
    return queryBuilder.getMany();
  }

  async create(movieCompany: MovieCompany) {
    const company = this.movieCompanyRepository.create(movieCompany);
    company.save();
    return company;
  }
}
