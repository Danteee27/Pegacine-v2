import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProfileEntity } from 'src/user/entities/profile.entity';
import { OkResponse } from 'libs/models/responses';
import { DeleteProfileSeriesCommand } from './delete_series.command';
import { Series } from 'src/movie/entities/series.entity';

@CommandHandler(DeleteProfileSeriesCommand)
export class DeleteProfileSeriesCommandHandler
  implements ICommandHandler<DeleteProfileSeriesCommand>
{
  constructor(
    @Inject('ProfileEntity_REPOSITORY')
    readonly profileRepository: Repository<ProfileEntity>,
    @Inject('SERIES_REPOSITORY')
    readonly seriesRepository: Repository<Series>,
  ) {}

  async execute(command: DeleteProfileSeriesCommand): Promise<unknown> {
    const { profile_id, seriesId } = command;

    const profile = await this.profileRepository.findOne({
      where: { profile_id },
      relations: ['MySeries'],
    });

    const series = await this.seriesRepository.findOneBy({ seriesId });

    if (!profile) {
      throw new BadRequestException('Profile not found');
    }

    if (!series) {
      throw new BadRequestException('Series not found');
    }

    profile.MySeries.forEach(function (value, index, arr) {
      if (value.seriesId == seriesId) {
        delete arr[index];
        return true;
      }
    });

    profile.save();

    return new OkResponse();
  }
}
