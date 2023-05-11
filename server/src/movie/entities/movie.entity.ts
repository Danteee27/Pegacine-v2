import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
  ManyToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { MovieGenres } from 'src/movie_genres/entities';
import { MovieKeywords } from 'src/movie_keywords/entities';
import { MovieCast } from 'src/movie_cast/entities';
import { MovieCrew } from 'src/movie_crew/entities';
import { MovieLanguages } from 'src/movie_languages/entities';
import { ProductionCountry } from 'src/production_country/entities';
import { MovieCompany } from 'src/movie_company/entities';
import { ApiProperty } from '@nestjs/swagger';
import { ProfileWatchingMovies } from 'src/user/entities/profile-watching.entity';
import { Series } from './series.entity';

@Entity('movie')
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  movie_id: number;

  @Column({ type: 'varchar', length: 1000 })
  @ApiProperty()
  title: string;

  @Column({ type: 'int', nullable: true })
  @ApiProperty()
  budget: number;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  @ApiProperty()
  homepage: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  @ApiProperty()
  overview: string;

  @Column({ type: 'decimal', precision: 12, scale: 6, nullable: true })
  @ApiProperty()
  popularity: number;

  @Column({ type: 'date', nullable: true })
  @ApiProperty()
  release_date: Date;

  @Column({ type: 'bigint', nullable: true })
  @ApiProperty()
  revenue: number;

  @Column({ type: 'int', nullable: true })
  @ApiProperty()
  runtime: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @ApiProperty()
  movie_status: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  @ApiProperty()
  tagline: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  @ApiProperty()
  vote_average: number;

  @Column({ type: 'int' })
  @ApiProperty()
  vote_count: number;

  @Column({ nullable: true, length: 1000 })
  @ApiProperty()
  image: string;

  @Column({ nullable: true, length: 1000 })
  @ApiProperty()
  backdrop: string;

  @Column({ nullable: true, length: 1000 })
  @ApiProperty()
  thumbnail: string;

  @Column({ nullable: true, length: 1000 })
  @ApiProperty()
  video: string;

  @Column({ nullable: true, length: 1000 })
  @ApiProperty()
  trailer: string;

  @Column({ nullable: true, default: 0 })
  @ApiProperty()
  isAdult: boolean;

  @Column({ nullable: true })
  @ApiProperty()
  isSeries: boolean;

  @Column({ nullable: true })
  @ApiProperty()
  seriesId: number;

  @ManyToOne(() => Series)
  @JoinColumn({ name: 'seriesId', referencedColumnName: 'seriesId' })
  series: Series;

  @Column({ nullable: true })
  @ApiProperty()
  seriesOrder: number;

  @Column({ nullable: true })
  @ApiProperty()
  poster: string;

  @Column({ default: 'SILVER' })
  @ApiProperty()
  userRank: string;

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
    (productionCountry) => productionCountry.movie,
  )
  production_country: ProductionCountry[];

  // @OneToMany(() => MovieCompany, (movieCompany) => movieCompany.movie)
  // movie_company: MovieCompany[];

  @OneToMany(() => ProfileWatchingMovies, (profile) => profile.movie)
  watching_movies: ProfileWatchingMovies[];
}
