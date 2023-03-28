import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gender {
  @PrimaryGeneratedColumn()
  gender_id: number;

  @Column({ type: 'varchar', length: 20 })
  gender: string;
}
