export class SearchMovieQuery {
  constructor(
    readonly queryString: string,
    readonly sort: string,
    readonly page: number,
    readonly pageSize: number,
  ) {}
}
