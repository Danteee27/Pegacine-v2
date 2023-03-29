import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MovieGenres } from 'src/movie_genres/entities';
@Entity('genre')
export class Genre {
  @PrimaryGeneratedColumn()
  genre_id: number;

  @Column({ type: 'varchar', length: 100 })
  genre_name: string;

  @OneToMany(() => MovieGenres, (movieGenres) => movieGenres.genre)
  movieGenres: MovieGenres[];
}
