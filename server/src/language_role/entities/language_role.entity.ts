import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MovieLanguages } from 'src/movie_languages/entities';

@Entity('language_role')
export class LanguageRole {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column({ type: 'varchar', length: 20 })
  language_role: string;

  @OneToMany(
    () => MovieLanguages,
    (movieLanguages) => movieLanguages.language_role,
  )
  movieLanguages: MovieLanguages[];
}
