import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MovieCrew } from 'src/movie_crew/entities';
@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  department_id: number;

  @Column({ type: 'varchar', length: 200 })
  department_name: string;

  @OneToMany(() => MovieCrew, (movieCrew) => movieCrew.department)
  movieCrew: MovieCrew[];
}
