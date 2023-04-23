import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddProfileMyListMovieCommand } from './add_profile_mylist_movie.command';
import { BadRequestException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProfileEntity } from 'src/user/entities/profile.entity';
import { Movie } from 'src/movie/entities';
import { OkResponse } from 'libs/models/responses';

@CommandHandler(AddProfileMyListMovieCommand)
export class AddProfileMyListMovieCommandHandler
  implements ICommandHandler<AddProfileMyListMovieCommand>
{
  constructor(
    @Inject('ProfileEntity_REPOSITORY')
    public readonly profileRepository: Repository<ProfileEntity>,
    @Inject('MOVIE_REPOSITORY')
    public readonly movieRepository: Repository<Movie>,
  ) {}

  async execute(command: AddProfileMyListMovieCommand) {
    const { profile_id, movie_id } = command;

    const profile = await this.profileRepository.findOne({
      where: { profile_id },
      relations: ['MyListMovies'],
    });

    const movie = await this.movieRepository.findOneBy({ movie_id });

    if (!profile) {
      throw new BadRequestException('Profile not found');
    }

    if (!movie) {
      throw new BadRequestException('Movie not found');
    }

    profile.MyListMovies.push(movie);

    profile.save();

    return new OkResponse();
  }
}
