import { BadRequestException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OkResponse } from 'libs/models/responses';
import { Movie } from 'src/movie/entities';
import { ProfileEntity } from 'src/user/entities/profile.entity';
import { Repository } from 'typeorm';
import { AddProfileFavoriteMovieCommand } from './add_profile_favorite_movie.command';

@CommandHandler(AddProfileFavoriteMovieCommand)
export class AddProfileFavoriteMovieCommandHandler
  implements ICommandHandler<AddProfileFavoriteMovieCommand>
{
  constructor(
    @Inject('ProfileEntity_REPOSITORY')
    readonly profileEntityRepository: Repository<ProfileEntity>,
    @Inject('MOVIE_REPOSITORY')
    readonly movieRepository: Repository<Movie>,
  ) {}

  async execute(command: AddProfileFavoriteMovieCommand) {
    const { profile_id, movie_id } = command;

    const profile = await this.profileEntityRepository.findOne({
      where: { profile_id },
      relations: ['FavoriteMovies'],
    });

    const movie = await this.movieRepository.findOneBy({ movie_id });

    if (!profile) {
      throw new BadRequestException('Profile not found');
    }

    if (!movie) {
      throw new BadRequestException('Movie not found');
    }

    profile.FavoriteMovies.push(movie);

    profile.save();

    return new OkResponse();
  }
}
