import ChangeLanguage from "./ChangeLanguage";
import useMovies from "../hooks/useMovies";
import styled from "styled-components";

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

const FormSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 15px;
  transition: all 1s;
  width: 400px;
  height: 50px;
  background: var(--primary-color);
  box-sizing: border-box;
  border-radius: 25px;
  padding: 5px;
  cursor: pointer;
  border: #000;
  @media (max-width: 768px) {
    width: 250px;
  }
`;

const InputSearch = styled.input`
  width: 100%;
  height: 40px;
  line-height: 20px;
  outline: 0;
  border: 0;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 1em;
  border-radius: 20px;
  padding: 0 20px;
  display: block;
`;

export { FilterMovie, InputSearch, FormSearch };
