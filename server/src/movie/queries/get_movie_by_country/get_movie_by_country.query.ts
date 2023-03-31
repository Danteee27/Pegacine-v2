export class GetMovieByCountryQuery {
  constructor(
    readonly country_id: number,
    readonly page: number,
    readonly pageSize: number,
  ) {}
}
