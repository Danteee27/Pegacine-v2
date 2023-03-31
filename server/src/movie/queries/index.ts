import { GetMovieQueryHandler } from './get_movie/get_movie.handler';
import { GetMovieByCastQueryHandler } from './get_movie_by_cast/get_movie_by_cast.handler';
import { GetMovieByGenresQueryHandler } from './get_movie_by_genres/get_movie_by_genres.handler';
import { SearchMovieQueryHandler } from './search_movie/search_movie.handler';

export const QueryHandlers = [
  GetMovieQueryHandler,
  SearchMovieQueryHandler,
  GetMovieByGenresQueryHandler,
  GetMovieByCastQueryHandler,
];
