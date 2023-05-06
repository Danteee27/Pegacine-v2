import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSeriesCommand } from './create_series.command';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Series } from 'src/movie/entities/series.entity';
import { OkResponse } from 'libs/models/responses';

@CommandHandler(CreateSeriesCommand)
export class CreateSeriesCommandHandler
  implements ICommandHandler<CreateSeriesCommand>
{
  constructor(
    @Inject('SERIES_REPOSITORY')
    public readonly seriesRepository: Repository<Series>,
  ) {}

  async execute(command: CreateSeriesCommand): Promise<any> {
    const { seriesName, seriesDescription } = command.dto;

    const newSeries = this.seriesRepository.create({
      seriesName,
      seriesDescription,
    });
    await newSeries.save();

    return new OkResponse(newSeries);
  }
}
