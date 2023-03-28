import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('genre')
export class Genre {
  @PrimaryGeneratedColumn()
  genre_id: number;

  @Column({ type: 'varchar', length: 100 })
  genre_name: string;
}
