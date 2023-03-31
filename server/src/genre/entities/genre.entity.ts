import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MovieGenres } from 'src/movie_genres/entities';
import { ApiProperty } from '@nestjs/swagger';
@Entity('genre')
export class Genre {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  genre_id: number;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty()
  genre_name: string;

  @OneToMany(() => MovieGenres, (movieGenres) => movieGenres.genre)
  movieGenres: MovieGenres[];
}
