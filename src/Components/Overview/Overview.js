import useMovies from "../hooks/useMovies";
import Loader from "../Loader/Loader";
import MovieDetails from "./MovieDetails";

const Overview = () => {
  const { loading } = useMovies();
  return <div>{loading ? <Loader /> : <MovieDetails />}</div>;
};

export default Overview;
