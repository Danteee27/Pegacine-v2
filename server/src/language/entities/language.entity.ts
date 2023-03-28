import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('language')
export class Language {
  @PrimaryGeneratedColumn()
  language_id: number;

  @Column({ type: 'varchar', length: 10 })
  language_code: string;

  @Column({ type: 'varchar', length: 500 })
  language_name: string;
}
