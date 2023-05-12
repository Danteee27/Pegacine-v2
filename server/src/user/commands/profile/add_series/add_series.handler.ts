import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddSeriesCommand } from './add_series.command';
import { BadRequestException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProfileEntity } from 'src/user/entities/profile.entity';
import { Series } from 'src/movie/entities/series.entity';

@CommandHandler(AddSeriesCommand)
export class AddSeriesCommandHandler
  implements ICommandHandler<AddSeriesCommand>
{
  constructor(
    @Inject('SERIES_REPOSITORY')
    readonly seriesRepository: Repository<Series>,
    @Inject('ProfileEntity_REPOSITORY')
    readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async execute(command: AddSeriesCommand) {
    const { profile_id, seriesId } = command;

    const profile = await this.profileRepository.findOne({
      where: { profile_id },
      relations: ['MySeries'],
    });

    if (!profile) {
      throw new BadRequestException('Profile not found');
    }

    const series = await this.seriesRepository.findOne({
      where: { seriesId },
    });

    if (!series) {
      throw new BadRequestException('Series not found');
    }

    profile.MySeries.push(series);

    profile.save();

    return profile;
  }
}
