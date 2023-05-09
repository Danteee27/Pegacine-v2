import axios from "axios";
import {
  createMovieFailure,
  createMovieStart,
  createMovieSuccess,
  deleteMovieFailure,
  deleteMovieStart,
  deleteMovieSuccess,
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
  getMovieStart,
  getMovieSuccess,
  getMovieFailure
} from "./MovieActions";

export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());
  try {
    const res = await axios.get("/movie/search", {
      params: {
        query: '',
        sort: 'a-z',
        page: 1,
        pageSize: 10000
      }
    }); // access token update later
    // const res = await axios.get("/movies", {
    //   headers: {
    //     token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    //   },
    // });
    dispatch(getMoviesSuccess(res.data.data.items));
  } catch (err) {
    dispatch(getMoviesFailure());
  }
};

export const getMovieById = async (id, dispatch) => {
  dispatch(getMoviesStart());
  try {
    const res = await axios.get("/movie/findById", {
      params: {
        id
      }
    }); // access token update later
    // const res = await axios.get("/movies", {
    //   headers: {
    //     token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    //   },
    // });
    dispatch(getMoviesSuccess(res.data.data));
  } catch (err) {
    dispatch(getMoviesFailure());
  }
}

//create
export const createMovie = async (movie, genres, dispatch) => {
  dispatch(createMovieStart());
  try {
    // const res = await axios.post("/movies", movie, {
    //   headers: {
    //     token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    //   },
    // });
    const res = await axios.post("/movie", movie);
    genres.forEach(async element => {
      await axios.post('/movie_genres', { genre_id: element.value, movie_id: res.data.data.movie_id })
    });
    // dispatch(createMovieSuccess(res.data));
  } catch (err) {
    dispatch(createMovieFailure());
  }
};

//delete
export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMovieStart());
  try {
    // await axios.delete("/movies/" + id, {
    //   headers: {
    //     token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    //   },
    // });
    await axios.delete("/movie/" + id);
    dispatch(deleteMovieSuccess(id));
  } catch (err) {
    dispatch(deleteMovieFailure());
  }
};