import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('language_role')
export class LanguageRole {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column({ type: 'varchar', length: 20 })
  language_role: string;
}
