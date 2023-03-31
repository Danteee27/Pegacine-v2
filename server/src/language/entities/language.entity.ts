import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MovieLanguages } from 'src/movie_languages/entities';
import { ApiProperty } from '@nestjs/swagger';

@Entity('language')
export class Language {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  language_id: number;

  @Column({ type: 'varchar', length: 10 })
  @ApiProperty()
  language_code: string;

  @Column({ type: 'varchar', length: 500 })
  @ApiProperty()
  language_name: string;

  @OneToMany(() => MovieLanguages, (movieLanguages) => movieLanguages.languages)
  @ApiProperty()
  movieLanguages: MovieLanguages[];
}
