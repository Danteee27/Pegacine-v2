import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Movie } from 'src/movie/entities';
import { Person } from 'src/person/entities';
import { Gender } from 'src/gender/entities';

@Entity('movie_cast')
export class MovieCast {
  @PrimaryColumn({ type: 'varchar', length: 400 })
  character_name: number;

  @PrimaryColumn({ type: 'int' })
  cast_order: number;

  @PrimaryColumn({ name: 'movie_id' })
  movie_id: number;

  @PrimaryColumn({ name: 'person_id' })
  person_id: number;

  @PrimaryColumn({ name: 'gender_id' })
  gender_id: number;

  @ManyToOne(() => Movie)
  @JoinColumn({ name: 'movie_id', referencedColumnName: 'movie_id' })
  movie: Movie;

  @ManyToOne(() => Person)
  @JoinColumn({ name: 'person_id', referencedColumnName: 'person_id' })
  person: Person;

  @ManyToOne(() => Gender)
  @JoinColumn({ name: 'gender_id', referencedColumnName: 'gender_id' })
  gender: Gender;
}
