import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Gender } from './entities';

@Injectable()
export class GenderService {
  constructor(
    @Inject('GENDER_REPOSITORY')
    private genderRepository: Repository<Gender>,
  ) {}

  async findAll(): Promise<Gender[]> {
    return this.genderRepository.find();
  }

  async findById(gender_id: number): Promise<Gender> {
    return this.genderRepository.findOneBy({ gender_id });
  }
}
