import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MovieGenres } from 'src/movie_genres/entities';
import { MovieKeywords } from 'src/movie_keywords/entities';
import { MovieCast } from 'src/movie_cast/entities';
import { MovieCrew } from 'src/movie_crew/entities';
import { MovieLanguages } from 'src/movie_languages/entities';
import { ProductionCountry } from 'src/production_country/entities';
import { MovieCompany } from 'src/movie_company/entities';

@Entity('movie')
export class Movie {
  @PrimaryGeneratedColumn()
  movie_id: number;

  @Column({ type: 'varchar', length: 1000 })
  title: string;

  @Column({ type: 'int', nullable: true })
  budget: number;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  homepage: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  overview: string;

  @Column({ type: 'decimal', precision: 12, scale: 6, nullable: true })
  popularity: number;

  @Column({ type: 'date', nullable: true })
  release_date: Date;

  @Column({ type: 'bigint', nullable: true })
  revenue: number;

  @Column({ type: 'int', nullable: true })
  runtime: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  movie_status: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  tagline: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  vote_average: number;

  @Column({ type: 'int' })
  vote_count: number;

  @OneToMany(() => MovieGenres, (movieGenres) => movieGenres.movie)
  movie_genres: MovieGenres[];

  @OneToMany(() => MovieKeywords, (movieKeywords) => movieKeywords.movie)
  movie_keywords: MovieKeywords[];

  @OneToMany(() => MovieCast, (movieCast) => movieCast.movie)
  movie_cast: MovieCast[];

  @OneToMany(() => MovieCrew, (movieCrew) => movieCrew.movie)
  movie_crew: MovieCrew[];

  @OneToMany(() => MovieLanguages, (movieLanguages) => movieLanguages.movie)
  movie_languages: MovieLanguages[];

  @OneToMany(
    () => ProductionCountry,
    (productionCountry) => productionCountry.country,
  )
  production_country: ProductionCountry[];

  @OneToMany(() => MovieCompany, (movieCompany) => movieCompany.movie)
  movie_company: MovieCompany[];
}
