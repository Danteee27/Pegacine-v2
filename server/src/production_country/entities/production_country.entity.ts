import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Generated,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { Movie } from 'src/movie/entities';
import { Country } from 'src/country/entities';

@Entity('production_country')
export class ProductionCountry {
  @PrimaryColumn({ name: 'movie_id' })
  movie_id: number;

  @PrimaryColumn({ name: 'country_id' })
  country_id: number;

  @ManyToOne(() => Movie)
  @JoinColumn({ name: 'movie_id', referencedColumnName: 'movie_id' })
  movie: Movie;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'country_id', referencedColumnName: 'country_id' })
  country: Country;
}
