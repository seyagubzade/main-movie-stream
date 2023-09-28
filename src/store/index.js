import { configureStore } from "@reduxjs/toolkit";
import {
  getMovieByIdReducer,
  getSimilarMovieReducer,
  nowPLayingReducer,
  popularMoviesReducer,
  topRatedMoviesReducer,
  upcomingMoviesReducer,
} from "./movies";
import {
  airingShowsReducer,
  onAirShowsReducer,
  popularShowsReducer,
  topRatedShowsReducer,
  getTVShowByIdReducer,
  getSimilarTVShowReducer,
} from "./tv-shows";

const store = configureStore({
  reducer: {
    nowPLaying: nowPLayingReducer,
    popularMovies: popularMoviesReducer,
    topRatedMovies: topRatedMoviesReducer,
    upcomingMovies: upcomingMoviesReducer,
    airingShows: airingShowsReducer,
    onAirShows: onAirShowsReducer,
    popularShows: popularShowsReducer,
    topRatedShows: topRatedShowsReducer,
    getTVShowById: getTVShowByIdReducer,
    getMovieById: getMovieByIdReducer,
    getSimilarTVShow: getSimilarTVShowReducer,
    getSimilarMovie: getSimilarMovieReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
