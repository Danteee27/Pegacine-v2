import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  Generated,
  PrimaryColumn,
} from 'typeorm';
// import 'reflect-metadata';
import { Movie } from 'src/movie/entities';
import { Genre } from 'src/genre/entities';

@Entity('movie_genres')
export class MovieGenres {
  @PrimaryColumn({ name: 'movie_id' })
  movie_id: number;

  @PrimaryColumn({ name: 'genre_id' })
  genre_id: number;

  @ManyToOne(() => Movie)
  @JoinColumn({ name: 'movie_id', referencedColumnName: 'movie_id' })
  movie: Movie;

  @ManyToOne(() => Genre)
  @JoinColumn({ name: 'genre_id', referencedColumnName: 'genre_id' })
  genre: Genre;
}
