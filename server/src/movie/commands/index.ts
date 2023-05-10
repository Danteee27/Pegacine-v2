import { CreateMovieCommandHandler } from './create_movie/create_movie.handler';
import { CreateSeriesCommandHandler } from './create_series/create_series.handler';
import { UpdateMovieCommandHandler } from './update_movie/update_movie.handler';
import { UpdateSeriesCommandHandler } from './update_series/update_series.handler';

export const CommandHandlers = [
  CreateMovieCommandHandler,
  CreateSeriesCommandHandler,
  UpdateMovieCommandHandler,
  UpdateSeriesCommandHandler,
];
