export class DeleteProfileSeriesCommand {
  constructor(
    public readonly profile_id: number,
    public readonly seriesId: number,
  ) {}
}
