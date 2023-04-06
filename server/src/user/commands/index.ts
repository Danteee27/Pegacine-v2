import { AddProfileFavoriteMovieCommandHandler } from './profile/add_profile_favorite_movie/add_profile_favorite_movie.handler';
import { CreateProfileCommandHandler } from './profile/create_profile/create_profile.handler';
import { DeleteProfileCommandHandler } from './profile/delete_profile';
import { DeleteProfileFavoriteMovieCommandHandler } from './profile/delete_profile_favorite_movie/delete_profile_favorite_movie.handler';
import { UpdateProfileCommandHandler } from './profile/update_profile/update_profile.handler';
import { LoginCommandHandler } from './user/login';
import { RegisterCommandHandler } from './user/register';

export const CommandHandlers = [
  RegisterCommandHandler,
  LoginCommandHandler,
  CreateProfileCommandHandler,
  DeleteProfileCommandHandler,
  UpdateProfileCommandHandler,
  AddProfileFavoriteMovieCommandHandler,
  DeleteProfileFavoriteMovieCommandHandler,
];
