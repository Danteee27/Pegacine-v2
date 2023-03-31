export class GetMovieByGenresQuery {
  constructor(
    public readonly genre_id: number,
    public readonly page: number,
    public readonly pageSize: number,
  ) {}
}
