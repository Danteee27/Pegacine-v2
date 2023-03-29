import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('person')
export class Person {
  @PrimaryGeneratedColumn()
  person_id: number;

  @Column({ type: 'varchar', length: 500 })
  person_name: string;
}
