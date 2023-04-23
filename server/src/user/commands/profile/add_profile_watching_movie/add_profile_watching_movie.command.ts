export class AddProfileWatchingMovieCommand {
  constructor(
    public readonly profile_id: number,
    public readonly movie_id: number,
    public readonly stoppedAt: number,
  ) {}
}
