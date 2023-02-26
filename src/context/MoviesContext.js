import { createContext } from "react";

const MoviesContext = createContext({
  playing: null,
  movieId:null
});
export default MoviesContext;
