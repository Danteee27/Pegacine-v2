import { DeleteProfileSeriesCommandHandler } from './delete_series/delete_series.handler';
import { AddProfileFavoriteMovieCommandHandler } from './profile/add_profile_favorite_movie/add_profile_favorite_movie.handler';
import { AddProfileMyListMovieCommandHandler } from './profile/add_profile_mylist_movie/add_profile_mylist_movie.handler';
import { AddProfileWatchingCommandHandler } from './profile/add_profile_watching_movie/add_profile_watching.handler';
import { AddSeriesCommandHandler } from './profile/add_series/add_series.handler';
import { CreateProfileCommandHandler } from './profile/create_profile/create_profile.handler';
import { DeleteProfileCommandHandler } from './profile/delete_profile';
import { DeleteProfileFavoriteMovieCommandHandler } from './profile/delete_profile_favorite_movie/delete_profile_favorite_movie.handler';
import { DeleteProfileMyListMovieCommandHandler } from './profile/delete_profile_mylist_movie/delete_profile_mylist_movie.handler';
import { DeleteProfileWatchingMovieCommandHandler } from './profile/delete_profile_watching_movie/delete_profile_watching_movie.handler';
import { UpdateProfileCommandHandler } from './profile/update_profile/update_profile.handler';
import { CheckTransactionCommandHandler } from './user/check-transaction/check-transaction.handler';
import { LoginCommandHandler } from './user/login';
import { RegisterCommandHandler } from './user/register';

export const CommandHandlers = [
  RegisterCommandHandler,
  LoginCommandHandler,
  CreateProfileCommandHandler,
  DeleteProfileCommandHandler,
  UpdateProfileCommandHandler,
  AddProfileFavoriteMovieCommandHandler,
  AddProfileWatchingCommandHandler,
  AddProfileMyListMovieCommandHandler,
  DeleteProfileFavoriteMovieCommandHandler,
  DeleteProfileMyListMovieCommandHandler,
  DeleteProfileWatchingMovieCommandHandler,
  CheckTransactionCommandHandler,
  AddSeriesCommandHandler,
  DeleteProfileSeriesCommandHandler,
];
