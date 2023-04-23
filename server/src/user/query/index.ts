import { GetProfilesQueryHandler } from './get_profiles/get_profiles.handler';
import { GetProfileFavoriteQueryHandler } from './get_profile_favorite/get_profile_favorite.handler';
import { GetProfileMyListQueryHandler } from './get_profile_mylist/get_profile_mylist.handler';
import { GetProfileWatchingQueryHandler } from './get_profile_watching/get_profile_watching.handler';
import { GetProfileWatchedQueryHandler } from './get_profile_watched/get_profile_watched.handler';

export const QueryHandlers = [
  GetProfilesQueryHandler,
  GetProfileFavoriteQueryHandler,
  GetProfileMyListQueryHandler,
  GetProfileWatchingQueryHandler,
  GetProfileWatchedQueryHandler,
];
