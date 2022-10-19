import FilterMovie from "./FilterMovie";
import Loader from "../Loader/Loader";
import Movies from "./Movies";
import Pagination from "./Pagination";
import useMovies from "../hooks/useMovies";
import { DisplayMovies } from "./UI/style";

const Home = ({ changePage, searchMovie, changeLanguage }) => {
  const { loading } = useMovies();
  return (
    <DisplayMovies>
      <FilterMovie searchMovie={searchMovie} changeLanguage={changeLanguage} />
      {loading ? <Loader /> : <Movies />}
      <Pagination changePage={changePage} />
    </DisplayMovies>
  );
};

export default Home;
