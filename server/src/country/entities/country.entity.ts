import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  country_id: number;

  @Column({ type: 'varchar', length: 10 })
  country_name: string;

  @Column({ type: 'varchar', length: 200 })
  country_iso_code: string;
}
