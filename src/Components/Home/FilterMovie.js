import ChangeLanguage from "./ChangeLanguage";
import useMovies from "../hooks/useMovies";
import { InputSearch, FormSearch } from "./UI/style";

const FilterMovie = ({ searchMovie, changeLanguage }) => {
  const { titleSearch } = useMovies();

  return (
    <>
      <div className="searchMovies">
        <div>
          <ChangeLanguage changeLanguage={changeLanguage} />
        </div>

        <FormSearch>
          <InputSearch onChange={searchMovie} placeholder={titleSearch} />
        </FormSearch>
      </div>
    </>
  );
};

export default FilterMovie;
