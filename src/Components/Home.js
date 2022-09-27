import FilterMovie from "./FilterMovie";
import Loader from "./Loader/Loader";
import Movies from "./Movies";
import Pagination from "./Pagination";
import ChangeLanguage from "./ChangeLanguage";
import useMovies from "./hooks/useMovies";

const Home = ({ changePage, changeLanguage, handleChange }) => {
  const { loading } = useMovies();
  return (
    <div className="Popular-Movies">
      <ChangeLanguage changeLanguage={changeLanguage} />
      <FilterMovie handleChange={handleChange} />
      {loading ? <Loader /> : <Movies />}
      <Pagination changePage={changePage} />
    </div>
  );
};

export default Home;
