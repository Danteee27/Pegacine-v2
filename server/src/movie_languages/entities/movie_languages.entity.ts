import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Generated,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { Movie } from 'src/movie/entities';
import { Language } from 'src/language/entities';
import { LanguageRole } from 'src/language_role/entities';

@Entity('movie_languages')
export class MovieLanguages {
  @PrimaryColumn({ name: 'movie_id' })
  movie_id: number;

  @PrimaryColumn({ name: 'language_id' })
  language_id: number;

  @PrimaryColumn({ name: 'language_role_id' })
  language_role_id: number;

  @ManyToOne(() => Movie)
  @JoinColumn({ name: 'movie_id', referencedColumnName: 'movie_id' })
  movie: Movie;

  @ManyToOne(() => Language)
  @JoinColumn({ name: 'language_id', referencedColumnName: 'language_id' })
  language: Language;

  @ManyToOne(() => LanguageRole)
  @JoinColumn({
    name: 'language_role_id',
    referencedColumnName: 'role_id',
  })
  language_role: LanguageRole;
}
