import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSeriesQuery } from './get_series.query';
import { Inject } from '@nestjs/common';
import { Series } from 'src/movie/entities/series.entity';
import { Repository } from 'typeorm';
import { OkResponse } from 'libs/models/responses';

@QueryHandler(GetSeriesQuery)
export class GetSeriesQueryHandler implements IQueryHandler<GetSeriesQuery> {
  constructor(
    @Inject('SERIES_REPOSITORY')
    private readonly seriesRepository: Repository<Series>,
  ) {}
  async execute(query: GetSeriesQuery): Promise<any> {
    const { seriesId } = query;
    const series = await this.seriesRepository
      .createQueryBuilder('series')
      .where('series.seriesId = :seriesId', { seriesId })
      .innerJoinAndSelect('series.movies', 'movies')
      .orderBy({ 'movies.seriesOrder': 'ASC' })
      .getOne();

    return new OkResponse(series);
  }
}
