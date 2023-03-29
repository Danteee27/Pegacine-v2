import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Person } from './entities';

@Injectable()
export class PersonService {
  constructor(
    @Inject('PERSON_REPOSITORY')
    private genreRepository: Repository<Person>,
  ) {}

  async findAll(): Promise<Person[]> {
    return this.genreRepository.find();
  }

  async findById(person_id: number): Promise<Person> {
    return this.genreRepository.findOneBy({ person_id });
  }
}
