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
}
