import {
  Pagination,
  paginate,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Genre } from './../../../genre/entities/genre.entity';
import { OkResponse } from './../../../../libs/models/responses/ok.response';
import { BaseResponse } from './../../../../libs/models/responses/base.response';
import { Like, Repository } from 'typeorm';
import { QueryHandler } from '@nestjs/cqrs';
import { IQuery, IQueryHandler } from '@nestjs/cqrs/dist';
import { Movie } from 'src/movie/entities';
import { BadRequestException, Inject } from '@nestjs/common';
import { SearchMovieQuery } from './search_movie.query';

@QueryHandler(SearchMovieQuery)
export class SearchMovieQueryHandler
  implements IQueryHandler<SearchMovieQuery>
{
  constructor(
    @Inject('MOVIE_REPOSITORY')
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async execute(
    query: SearchMovieQuery,
  ): Promise<BaseResponse<Pagination<Movie>>> {
    let { queryString, page, pageSize, sort } = query;
    queryString = queryString.trim();
    sort = sort.trim().toLowerCase();
    // const movies = await this.movieRepository.find({
    //   where: [
    //     { title: Like(`%${queryString}%`) },
    //     { movie_genres: Like(`%${queryString}%`) },
    //   ],

    //   //   relations: [
    //   //     'movie_genres.genre',
    //   //     'movie_cast.person',
    //   //     'movie_keywords',
    //   //     'movie_languages.languages',
    //   //     'movie_company.company',
    //   //     'movie_crew',
    //   //     // production_country: true,
    //   //   ],
    // });

    // if (!movies) {
    //   throw new BadRequestException('No movies found');
    // }
    const queryBuilder = this.movieRepository.createQueryBuilder('movie');
    queryBuilder.innerJoinAndSelect('movie.movie_genres', 'movie_genres');
    if (sort == 'a-z') {
      queryBuilder.orderBy('movie.title', 'ASC');
    }
    if (sort == 'year') {
      queryBuilder.orderBy('movie.release_date', 'DESC');
    }
    if (sort == 'z-a') {
      queryBuilder.orderBy('movie.title', 'DESC');
    }
    queryBuilder.where([
      { title: Like(`%${queryString}%`) },
      { tagline: Like(`#${queryString}%`) },
    ]);

    const x = await paginate<Movie>(queryBuilder, {
      page: page,
      limit: pageSize,
    });

    return new OkResponse(x);
  }
}
