import ChangeLanguage from "./ChangeLanguage";
import useMovies from "../hooks/useMovies";

const FilterMovie = ({ handleChange, changeLanguage }) => {
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
            onChange={handleChange}
            placeholder={titleSearch}
          />
        </div>
      </div>
    </>
  );
};

export default FilterMovie;
