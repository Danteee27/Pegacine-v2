import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm';
import { Movie } from 'src/movie/entities';
import { Department } from 'src/department/entities';
import { Person } from 'src/person/entities';
import { ApiProperty } from '@nestjs/swagger';

@Entity('movie_crew')
export class MovieCrew {
  @PrimaryColumn({ name: 'movie_id' })
  @ApiProperty()
  movie_id: number;

  @PrimaryColumn({ name: 'person_id' })
  @ApiProperty()
  person_id: number;

  @PrimaryColumn({ name: 'department_id' })
  @ApiProperty()
  department_id: number;

  @ManyToOne(() => Movie)
  @JoinColumn({ name: 'movie_id', referencedColumnName: 'movie_id' })
  movie: Movie;

  @ManyToOne(() => Person)
  @JoinColumn({ name: 'person_id', referencedColumnName: 'person_id' })
  person: Person;

  @ManyToOne(() => Department)
  @JoinColumn({ name: 'department_id', referencedColumnName: 'department_id' })
  department: Department;

  @PrimaryColumn({ type: 'varchar', length: 200 })
  @ApiProperty()
  job: string;
}
