import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { MovieCompany } from 'src/movie_company/entities';

@Entity('production_company')
export class ProductionCompany {
  @PrimaryGeneratedColumn()
  company_id: number;

  @Column({ type: 'varchar', length: 200 })
  company_name: string;

  @OneToMany(() => MovieCompany, (movieCompany) => movieCompany)
  movieCompany: MovieCompany[];
}
