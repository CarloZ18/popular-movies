import useMovies from "./hooks/useMovies";

const FilterMovie = ({ handleChange }) => {
  const { titleSearch } = useMovies();

  return (
    <>
      <div className="searchMovies">
        <div className="form">
          <input
            className="inputSearch"
            onChange={handleChange}
            placeholder={titleSearch}
          />
        </div>
      </div>
    </>
  );
};

export default FilterMovie;
