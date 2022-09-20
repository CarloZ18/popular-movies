import FilterMovie from "./FilterMovie";
import Loader from "./Loader/Loader";
import Movies from "./Movies";
import Pagination from "./Pagination";

const Home = ({ loading, changePage, handleChange }) => {
  return (
    <div className="Popular-Movies">
      <FilterMovie handleChange={handleChange} />
      {loading ? <Loader /> : <Movies />}
      <Pagination changePage={changePage} />
    </div>
  );
};

export default Home;
