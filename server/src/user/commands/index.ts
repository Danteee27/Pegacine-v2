import { UpdateProfileCommandHandler } from './update_profile/update_profile.handler';
import { DeleteProfileCommandHandler } from './delete_profile/delete_profile.handler';
import { RegisterCommandHandler } from './register/register.handler';
import { LoginCommandHandler } from './login';
import { CreateProfileCommandHandler } from './create_profile/create_profile.handler';
import { ProfileFavoriteMovieCommandHandler } from './profile_favorite_movie/profile_favorite_movie.handler';
import { ProfileMyListMovieCommandHandler } from './profile_mylist_movie/profile_mylist_movie.handler';

export const CommandHandlers = [
  RegisterCommandHandler,
  LoginCommandHandler,
  CreateProfileCommandHandler,
  DeleteProfileCommandHandler,
  UpdateProfileCommandHandler,
  ProfileFavoriteMovieCommandHandler,
  ProfileMyListMovieCommandHandler,
];
