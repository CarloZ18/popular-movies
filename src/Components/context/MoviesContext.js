import { createContext } from "react";

const MoviesContext = createContext({
  page: 1,
  movieName: "",
  textRecommendations:null,
  language:null,
  moreInfo:null,
  loading:null,
  filterMovie:null,
  next: "Next",
  previous: "Previous",
  titleSearch:null,
  checkedLenguage:null,
  returnText:null,
  movieId:null,
});
export default MoviesContext;
