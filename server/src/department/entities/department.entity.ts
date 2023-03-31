import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { MovieCrew } from 'src/movie_crew/entities';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Department extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  department_id: number;

  @Column({ type: 'varchar', length: 200 })
  @ApiProperty()
  department_name: string;

  @OneToMany(() => MovieCrew, (movieCrew) => movieCrew.department)
  movieCrew: MovieCrew[];
}
