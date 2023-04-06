import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddProfileWatchingMovieCommand } from './add_profile_watching_movie.command';
import { BadRequestException, Inject } from '@nestjs/common';
import { ProfileWatchingMovies } from 'src/user/entities/profile-watching.entity';
import { Repository } from 'typeorm';
import { OkResponse } from 'libs/models/responses';
import { ProfileEntity } from 'src/user/entities/profile.entity';
import { Movie } from 'src/movie/entities';

@CommandHandler(AddProfileWatchingMovieCommand)
export class AddProfileWatchingCommandHandler
  implements ICommandHandler<AddProfileWatchingMovieCommand>
{
  constructor(
    @Inject('ProfileWatchingMovies_REPOSITORY')
    private readonly profileWatchingRepository: Repository<ProfileWatchingMovies>,
    @Inject('ProfileEntity_REPOSITORY')
    private readonly profileRepository: Repository<ProfileEntity>,
    @Inject('MOVIE_REPOSITORY')
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async execute(command: AddProfileWatchingMovieCommand): Promise<any> {
    const { profile_id, movie_id, stoppedAt } = command;

    const watchingMovie = await this.profileWatchingRepository.findOne({
      where: { profile_id, movie_id },
      relations: ['movie'],
    });

    const movie = await this.movieRepository.findOneBy({ movie_id });
    if (!movie) {
      throw new BadRequestException('Movie not found');
    }

    const profile = await this.profileRepository.findOne({
      where: { profile_id },
      relations: ['WatchedMovies'],
    });
    if (!profile) {
      throw new BadRequestException('Profile not found');
    }

    if (stoppedAt >= movie.runtime) {
      if (watchingMovie) {
        await watchingMovie.remove();
      }

      profile.WatchedMovies.push(movie);
      await profile.save();

      return new OkResponse(`Movie ${movie_id} is added to watched movies`);
    }

    profile.WatchedMovies.forEach((value, index, arr) => {
      if (value.movie_id == movie_id) {
        delete arr[index];

        return true;
      }
    });
    await profile.save();

    if (watchingMovie) {
      watchingMovie.stoppedAt = stoppedAt;
      await watchingMovie.save();
      return new OkResponse(watchingMovie);
    }

    const newWatchingMovie = this.profileWatchingRepository.create({
      profile_id,
      movie_id,
      stoppedAt,
    });

    await newWatchingMovie.save();

    return new OkResponse(newWatchingMovie);
  }
}
