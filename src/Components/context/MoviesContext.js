import { createContext } from "react";

const MoviesContext = createContext({
  pageNum: 1,
  movieName: null,
  next: "Next",
  previous: "Previous",
  titleSearch:null,
  containerMovies:null,
  checkedLenguage:null,
});
export default MoviesContext;
