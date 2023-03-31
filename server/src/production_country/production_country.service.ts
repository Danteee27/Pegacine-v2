import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductionCountry } from './entities';
import { Country } from 'src/country/entities';
import { Movie } from 'src/movie/entities';

@Injectable()
export class ProductionCountryService {
  constructor(
    @Inject('PRODUCTIONCOUNTRY_REPOSITORY')
    private productionCountryRepository: Repository<ProductionCountry>,
  ) {}

  async findAll(): Promise<ProductionCountry[]> {
    return this.productionCountryRepository.find();
  }

  async findById(country_id: number): Promise<ProductionCountry> {
    return this.productionCountryRepository.findOne({
      where: { country_id },
      relations: ['country'],
    });
  }

  async findByMovieId(movie_id: number): Promise<ProductionCountry[]> {
    const queryBuilder =
      this.productionCountryRepository.createQueryBuilder('production_country');
    queryBuilder.where('production_country.movie_id = :movie_id', { movie_id });
    queryBuilder.innerJoinAndSelect('production_country.country', 'country');
    return queryBuilder.getMany();
  }
}
