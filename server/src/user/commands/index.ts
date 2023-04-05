import { UpdateProfileCommandHandler } from './update_profile/update_profile.handler';
import { DeleteProfileCommandHandler } from './delete_profile/delete_profile.handler';
import { RegisterCommandHandler } from './register/register.handler';
import { LoginCommandHandler } from './login';
import { CreateProfileCommandHandler } from './create_profile/create_profile.handler';
import { AddProfileFavoriteMovieCommandHandler } from './add_profile_favorite_movie/add_profile_favorite_movie.handler';
import { AddProfileMyListMovieCommandHandler } from './add_profile_mylist_movie/add_profile_mylist_movie.handler';
import { DeleteProfileFavoriteMovieCommandHandler } from './delete_profile_favorite_movie/delete_profile_favorite_movie.handler';

export const CommandHandlers = [
  RegisterCommandHandler,
  LoginCommandHandler,
  CreateProfileCommandHandler,
  DeleteProfileCommandHandler,
  UpdateProfileCommandHandler,
  AddProfileFavoriteMovieCommandHandler,
  DeleteProfileFavoriteMovieCommandHandler,
];
