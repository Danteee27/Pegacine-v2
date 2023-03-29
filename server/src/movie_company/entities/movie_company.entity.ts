import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Movie } from 'src/movie/entities';
import { ProductionCompany } from 'src/production_company/entities';
@Entity('movie_company')
export class MovieCompany {
  @PrimaryColumn({ name: 'movie_id' })
  movie_id: number;

  @PrimaryColumn({ name: 'company_id' })
  company_id: number;

  @ManyToOne(() => Movie)
  @JoinColumn({ name: 'movie_id', referencedColumnName: 'movie_id' })
  movie: Movie;

  @ManyToOne(() => ProductionCompany)
  @JoinColumn({ name: 'company_id', referencedColumnName: 'company_id' })
  company: ProductionCompany;
}
