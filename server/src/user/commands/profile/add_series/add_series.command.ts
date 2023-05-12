export class AddSeriesCommand {
  constructor(
    public readonly profile_id: number,
    public readonly seriesId: number,
  ) {}
}
