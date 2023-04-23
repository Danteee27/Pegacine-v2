export class GetProfileFavoriteQuery {
  constructor(
    public readonly profile_id: number,
    public readonly page: number,
    public readonly pageSize,
  ) {}
}
