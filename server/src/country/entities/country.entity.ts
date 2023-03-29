import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductionCountry } from 'src/production_country/entities';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  country_id: number;

  @Column({ type: 'varchar', length: 10 })
  country_name: string;

  @Column({ type: 'varchar', length: 200 })
  country_iso_code: string;

  @OneToMany(
    () => ProductionCountry,
    (productionCountry) => productionCountry.country,
  )
  productionCountry: ProductionCountry[];
}
