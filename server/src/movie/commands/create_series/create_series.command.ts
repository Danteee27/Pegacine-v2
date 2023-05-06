import { CreateSeriesDto } from './create_series.dto';

export class CreateSeriesCommand {
  constructor(public readonly dto: CreateSeriesDto) {}
}
