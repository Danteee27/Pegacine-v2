import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MovieLanguages } from 'src/movie_languages/entities';

@Entity('language')
export class Language {
  @PrimaryGeneratedColumn()
  language_id: number;

  @Column({ type: 'varchar', length: 10 })
  language_code: string;

  @Column({ type: 'varchar', length: 500 })
  language_name: string;

  @OneToMany(() => MovieLanguages, (movieLanguages) => movieLanguages.languages)
  movieLanguages: MovieLanguages[];
}
