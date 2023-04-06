export class AddProfileFavoriteMovieCommand {
  constructor(
    public readonly profile_id: number,
    public readonly movie_id: number,
  ) {}
}
