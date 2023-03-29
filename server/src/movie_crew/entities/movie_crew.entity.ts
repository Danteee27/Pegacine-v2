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

@Entity('movie_crew')
export class MovieCrew {
  @PrimaryColumn({ name: 'movie_id' })
  movie_id: number;

  @PrimaryColumn({ name: 'person_id' })
  person_id: number;

  @PrimaryColumn({ name: 'department_id' })
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

  @Column({ type: 'varchar', length: 200 })
  job: string;
}
