import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Movie } from '.';

@Entity('series')
export class Series extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  seriesId: number;

  @Column()
  @ApiProperty()
  seriesName: string;

  @Column({ nullable: true })
  @ApiProperty()
  seriesDescription: string;

  @Column({ nullable: true })
  @ApiProperty()
  trailer: string;

  @Column({ nullable: true })
  @ApiProperty()
  poster: string;

  @Column({ nullable: true })
  @ApiProperty()
  thumbnail: string;

  @Column({ nullable: true })
  @ApiProperty()
  backdrop: string;

  @OneToMany(() => Movie, (movie) => movie.series)
  @ApiProperty()
  movies: Movie[];
}
