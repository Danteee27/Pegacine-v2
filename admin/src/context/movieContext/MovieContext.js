import MovieReducer from "./MovieReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    movies: [],
    isFetching: false,
    error: false,
};

const MOVIE_INITIAL_STATE = {
  movie: null,
  isFetching: false,
  error: false,
};

export const MovieContext = createContext(INITIAL_STATE);
export const MovieByIdContext = createContext(MOVIE_INITIAL_STATE);

export const MovieByIdContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MovieReducer, MOVIE_INITIAL_STATE);

  return (
    <MovieByIdContext.Provider
      value={{
        movie: state.movie,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </MovieByIdContext.Provider>
  );
}

export const MovieContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MovieReducer, INITIAL_STATE);

  return (
    <MovieContext.Provider
      value={{
        movies: state.movies,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};