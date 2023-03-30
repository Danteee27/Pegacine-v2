export class SearchMovieQuery {
  constructor(
    readonly queryString: string,
    readonly page: number,
    readonly pageSize: number,
  ) {}
}
