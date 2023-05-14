import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSeriesCommand } from './update_series.command';
import { Repository } from 'typeorm';
import { Series } from 'src/movie/entities/series.entity';
import { BadRequestException, Inject } from '@nestjs/common';
import { OkResponse } from 'libs/models/responses';

@CommandHandler(UpdateSeriesCommand)
export class UpdateSeriesCommandHandler
  implements ICommandHandler<UpdateSeriesCommand>
{
  constructor(
    @Inject('SERIES_REPOSITORY')
    public readonly seriesRepository: Repository<Series>,
  ) {}

  async execute(command: UpdateSeriesCommand): Promise<any> {
    const existedSeries = await this.seriesRepository.findOne({
      where: { seriesId: command.seriesId },
    });

    if (!existedSeries) {
      throw new BadRequestException('Series not found');
    }

    existedSeries.seriesName =
      command.dto.seriesName || existedSeries.seriesName;
    existedSeries.seriesDescription =
      command.dto.seriesDescription || existedSeries.seriesDescription;

    await existedSeries.save();

    return new OkResponse(existedSeries);
  }
}
