import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
