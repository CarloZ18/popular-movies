import FilterMovie from "./FilterMovie";
import Loader from "../Loader/Loader";
import Movies from "./Movies";
import Pagination from "./Pagination";
import useMovies from "../hooks/useMovies";

const Home = ({ changePage, searchMovie, changeLanguage }) => {
  const { loading } = useMovies();
  return (
    <div className="display-movies">
      <FilterMovie
        searchMovie={searchMovie}
        changeLanguage={changeLanguage}
      />
      {loading ? <Loader /> : <Movies />}
      <Pagination changePage={changePage} />
    </div>
  );
};

export default Home;
