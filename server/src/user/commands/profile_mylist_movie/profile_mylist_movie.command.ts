export class ProfileMyListMovieCommand {
  constructor(
    public readonly profile_id: number,
    public readonly movie_id: number,
  ) {}
}
