import useMovies from "../hooks/useMovies";
const Movies = () => {

  const {movieName, containerMovies} = useMovies();

  return (
    <div className="container-movies" ref={containerMovies}>
      {movieName}
    </div>
  );  
};

export default Movies;
