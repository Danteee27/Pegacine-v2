import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('keyword')
export class Keyword {
  @PrimaryGeneratedColumn()
  keyword_id: number;

  @Column({ type: 'varchar', length: 100 })
  keyword_name: string;
}
