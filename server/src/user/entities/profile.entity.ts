import { Movie } from './../../movie/entities/movie.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'profiles' })
export class ProfileEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  profile_id: number;

  @Column()
  user_id: number;

  @ManyToOne((type) => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @ManyToMany(() => Movie)
  @JoinTable({
    name: 'profile_watching_movies', // table name for the junction table of this relation
    joinColumn: {
      name: 'profile_id',
      referencedColumnName: 'profile_id',
    },
    inverseJoinColumn: {
      name: 'movie_id',
      referencedColumnName: 'movie_id',
    },
  })
  WatchingMovies: Movie[];

  @ManyToMany(() => Movie)
  @JoinTable({
    name: 'profile_favorite_movies', // table name for the junction table of this relation
    joinColumn: {
      name: 'profile_id',
      referencedColumnName: 'profile_id',
    },
    inverseJoinColumn: {
      name: 'movie_id',
      referencedColumnName: 'movie_id',
    },
  })
  FavoriteMovies: Movie[];

  @ManyToMany(() => Movie)
  @JoinTable({
    name: 'profile_mylist_movies', // table name for the junction table of this relation
    joinColumn: {
      name: 'profile_id',
      referencedColumnName: 'profile_id',
    },
    inverseJoinColumn: {
      name: 'movie_id',
      referencedColumnName: 'movie_id',
    },
  })
  MyListMovies: Movie[];
}
