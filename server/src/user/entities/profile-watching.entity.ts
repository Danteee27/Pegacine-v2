import { Movie } from 'src/movie/entities';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'profile_watching_movies' })
export class ProfileWatchingMovies extends BaseEntity {
  @PrimaryColumn({ name: 'movie_id' })
  @ApiProperty()
  movie_id: number;

  @PrimaryColumn({ name: 'profile_id' })
  @ApiProperty()
  profile_id: number;

  @Column({ default: 0 })
  stoppedAt: number;

  @ManyToOne(() => Movie)
  @JoinColumn({ name: 'movie_id', referencedColumnName: 'movie_id' })
  movie: Movie;

  @ManyToOne(() => ProfileEntity)
  @JoinColumn({ name: 'profile_id', referencedColumnName: 'profile_id' })
  profile: ProfileEntity;
}
