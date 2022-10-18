import ChangeLanguage from "./ChangeLanguage";
import useMovies from "../hooks/useMovies";

const FilterMovie = ({ searchMovie, changeLanguage }) => {
  const { titleSearch } = useMovies();

  return (
    <>
      <div className="searchMovies">
        <div>
          <ChangeLanguage changeLanguage={changeLanguage} />
        </div>

        <div className="form">
          <input
            className="inputSearch"
            onChange={searchMovie}
            placeholder={titleSearch}
          />
        </div>
      </div>
    </>
  );
};

export default FilterMovie;
