import { createContext } from "react";

const MoviesContext = createContext({
  page: 1,
  movieName: null,
  textRecommendations:null,
  language:null,
  moreInfo:null,
  loading:null,
  filterMovie:null,
  watchTrailer:null,
  next: "Next",
  previous: "Previous",
  titleSearch:null,
  containerMovies:null,
  checkedLenguage:null,
  returnText:null,
  movieId:null,
  playing:null
  
});
export default MoviesContext;
