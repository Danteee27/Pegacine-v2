import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  department_id: number;

  @Column({ type: 'varchar', length: 200 })
  department_name: string;
}
