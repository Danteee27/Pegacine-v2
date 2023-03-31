import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('person')
export class Person {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  person_id: number;

  @Column({ type: 'varchar', length: 500 })
  @ApiProperty()
  person_name: string;
}
