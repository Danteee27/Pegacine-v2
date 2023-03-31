export class GetMovieByCastQuery {
  constructor(
    readonly person_id: number,
    readonly page: number,
    readonly pageSize: number,
  ) {}
}
