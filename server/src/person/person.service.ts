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

  async create(person: Person): Promise<Person> {
    return this.genreRepository.save(person);
  }

  async delete(person_id: number): Promise<Person> {
    const person = await this.findById(person_id);
    return this.genreRepository.remove(person);
  }
}
