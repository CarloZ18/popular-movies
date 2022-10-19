import useMovies from "../hooks/useMovies";
import { ContainerMovies } from "./UI/style";
const Movies = () => {
  const { movieName } = useMovies();

  return (
    <ContainerMovies className="container-movies">{movieName}</ContainerMovies>
  );
};

export default Movies;
