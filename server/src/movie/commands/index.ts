import { CreateMovieCommandHandler } from './create_movie/create_movie.handler';
import { CreateSeriesCommandHandler } from './create_series/create_series.handler';

export const CommandHandlers = [
  CreateMovieCommandHandler,
  CreateSeriesCommandHandler,
];
