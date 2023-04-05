import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProfileFavoriteMovieCommand } from './delete_profile_favorite_movie.command';
import { BadRequestException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProfileEntity } from 'src/user/entities/profile.entity';
import { Movie } from 'src/movie/entities';
import { OkResponse } from 'libs/models/responses';

@CommandHandler(DeleteProfileFavoriteMovieCommand)
export class DeleteProfileFavoriteMovieCommandHandler
  implements ICommandHandler<DeleteProfileFavoriteMovieCommand>
{
  constructor(
    @Inject('ProfileEntity_REPOSITORY')
    readonly profileRepository: Repository<ProfileEntity>,
    @Inject('MOVIE_REPOSITORY')
    readonly movieRepository: Repository<Movie>,
  ) {}

  async execute(command: DeleteProfileFavoriteMovieCommand): Promise<unknown> {
    const { profile_id, movie_id } = command;

    const profile = await this.profileRepository.findOne({
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

    profile.FavoriteMovies.forEach(function (value, index, arr) {
      if (value.movie_id == movie_id) {
        delete arr[index];
        return true;
      }
    });

    profile.save();

    return new OkResponse();
  }
}
