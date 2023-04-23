import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProfileMyListMovieCommand } from './delete_profile_mylist_movie.command';
import { Repository } from 'typeorm';
import { ProfileEntity } from 'src/user/entities/profile.entity';
import { BadRequestException, Inject } from '@nestjs/common';
import { OkResponse } from 'libs/models/responses';

@CommandHandler(DeleteProfileMyListMovieCommand)
export class DeleteProfileMyListMovieCommandHandler
  implements ICommandHandler<DeleteProfileMyListMovieCommand>
{
  constructor(
    @Inject('ProfileEntity_REPOSITORY')
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async execute(command: DeleteProfileMyListMovieCommand): Promise<any> {
    const { profile_id, movie_id } = command;

    const profile = await this.profileRepository.findOne({
      where: { profile_id },
      relations: ['MyListMovies'],
    });

    if (!profile) {
      throw new BadRequestException('Profile not found');
    }

    profile.MyListMovies.forEach((value, index, arr) => {
      if (value.movie_id == movie_id) {
        delete arr[index];
        return true;
      }
    });

    await profile.save();

    return new OkResponse();
  }
}
