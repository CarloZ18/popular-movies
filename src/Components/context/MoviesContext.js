import { createContext } from "react";

const MoviesContext = createContext({
  page: 1,
  movieName: null,
  recommendations:null,
  textRecommendations:null,
  language:null,
  moreInfo:null,
  loading:null,
  posterOverview:null,
  titleOverview:null,
  overview:null,
  filterMovie:null,
  watchTrailer:null,
  trailer:null,
  next: "Next",
  previous: "Previous",
  titleSearch:null,
  containerMovies:null,
  checkedLenguage:null,
  returnText:null,
});
export default MoviesContext;
