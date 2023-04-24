import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  BaseEntity,
} from 'typeorm';
import { Movie } from 'src/movie/entities';
import { Person } from 'src/person/entities';
import { Gender } from 'src/gender/entities';
import { ApiProperty } from '@nestjs/swagger';

@Entity('movie_cast')
export class MovieCast extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 400 })
  @ApiProperty()
  character_name: string;

  @PrimaryColumn({ type: 'int' })
  @ApiProperty()
  cast_order: number;

  @PrimaryColumn({ name: 'movie_id' })
  @ApiProperty()
  movie_id: number;

  @PrimaryColumn({ name: 'person_id' })
  @ApiProperty()
  person_id: number;

  @PrimaryColumn({ name: 'gender_id', default: 0 })
  @ApiProperty()
  gender_id: number;

  @ManyToOne(() => Movie)
  @JoinColumn({ name: 'movie_id', referencedColumnName: 'movie_id' })
  movie: Movie;

  @ManyToOne(() => Person)
  @JoinColumn({ name: 'person_id', referencedColumnName: 'person_id' })
  person: Person;

  // @ManyToOne(() => Gender)
  // @JoinColumn({ name: 'gender_id', referencedColumnName: 'gender_id' })
  // gender: Gender;
}
