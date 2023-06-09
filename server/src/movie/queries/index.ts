import { GetMovieQueryHandler } from './get_movie/get_movie.handler';
import { GetMovieByCastQueryHandler } from './get_movie_by_cast/get_movie_by_cast.handler';
import { GetMovieByCountryQueryHandler } from './get_movie_by_country/get_movie_by_country.handler';
import { GetMovieByCrewQueryHandler } from './get_movie_by_crew/get_movie_by_crew.handler';
import { GetMovieByGenresQueryHandler } from './get_movie_by_genres/get_movie_by_genres.handler';
import { GetSeriesQueryHandler } from './get_series/get_series.handler';
import { SearchMovieQueryHandler } from './search_movie/search_movie.handler';

export const QueryHandlers = [
  GetMovieQueryHandler,
  SearchMovieQueryHandler,
  GetMovieByGenresQueryHandler,
  GetMovieByCastQueryHandler,
  GetMovieByCrewQueryHandler,
  GetMovieByCountryQueryHandler,
  GetSeriesQueryHandler,
];
