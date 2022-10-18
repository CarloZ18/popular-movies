import useMovies from "../hooks/useMovies";
const Movies = ({ returnHome }) => {
  const { movieName, containerMovies } = useMovies();

  return (
    <div className="container-movies" ref={containerMovies}>
      {movieName}
    </div>
  );
};

export default Movies;
