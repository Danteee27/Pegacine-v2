import { UpdateSeriesDto } from './update_series.dto';

export class UpdateSeriesCommand {
  constructor(
    public readonly seriesId: number,
    public readonly dto: UpdateSeriesDto,
  ) {}
}
