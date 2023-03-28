import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Country } from './entities';

@Injectable()
export class CountryService {
  constructor(
    @Inject('COUNTRY_REPOSITORY')
    private countryRepository: Repository<Country>,
  ) {}

  async findAll(): Promise<Country[]> {
    return this.countryRepository.find();
  }

  async findById(country_id: number): Promise<Country> {
    return this.countryRepository.findOneBy({ country_id });
  }
}
