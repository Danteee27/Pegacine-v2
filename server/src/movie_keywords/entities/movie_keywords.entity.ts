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
import { Movie } from 'src/movie/entities';
import { Keyword } from 'src/keyword/entities';

@Entity('movie_keywords')
export class MovieKeywords {
  @PrimaryColumn({ name: 'movie_id' })
  movie_id: number;

  @PrimaryColumn({ name: 'keyword_id' })
  keyword_id: number;

  @ManyToOne(() => Movie)
  @JoinColumn({ name: 'movie_id', referencedColumnName: 'movie_id' })
  movie: Movie;

  @ManyToOne(() => Keyword)
  @JoinColumn({ name: 'keyword_id', referencedColumnName: 'keyword_id' })
  keyword: Keyword;
}
