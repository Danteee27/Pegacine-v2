import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProfileWatchingMovieCommand } from './delete_profile_watching_movie.command';
import { BadRequestException, Inject } from '@nestjs/common';
import { ProfileWatchingMovies } from 'src/user/entities/profile-watching.entity';
import { Repository } from 'typeorm';
import { OkResponse } from 'libs/models/responses';

@CommandHandler(DeleteProfileWatchingMovieCommand)
export class DeleteProfileWatchingMovieCommandHandler
  implements ICommandHandler<DeleteProfileWatchingMovieCommand>
{
  constructor(
    @Inject('ProfileWatchingMovies_REPOSITORY')
    private readonly profileWatchingRepository: Repository<ProfileWatchingMovies>,
  ) {}

  async execute(command: DeleteProfileWatchingMovieCommand): Promise<any> {
    const { profile_id, movie_id } = command;

    const watching = await this.profileWatchingRepository.findOne({
      where: { profile_id, movie_id },
    });

    if (!watching) {
      throw new BadRequestException('Watching movie not found');
    }

    watching.remove();

    watching.save();

    return new OkResponse();
  }
}
