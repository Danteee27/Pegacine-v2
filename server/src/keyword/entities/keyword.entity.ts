import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('keyword')
export class Keyword {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  keyword_id: number;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty()
  keyword_name: string;
}
