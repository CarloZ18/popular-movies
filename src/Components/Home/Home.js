import {FilterMovie} from "./FilterMovie";
import Loader from "../Loader/Loader";
import Movies from "./Movies";
import {Pagination} from "./Pagination";
import useMovies from "../hooks/useMovies";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import styled from "styled-components";

const Home = ({ changePage, searchMovie, changeLanguage, getData }) => {
  const { page, loading, movieName } = useMovies();
  return (
    <DisplayMovies>
      <FilterMovie searchMovie={searchMovie} changeLanguage={changeLanguage} />
      <SwitchTransition>
        <CSSTransition
          key={page}
          addEndListener={(node, done) =>
            node.addEventListener("transitionend", done, false)
          }
          classNames="fade"
        >
          {loading ? (
            <Loader />
          ) : (
            <Movies movieName={movieName} getData={getData} />
          )}
        </CSSTransition>
      </SwitchTransition>
      <Pagination changePage={changePage} />
    </DisplayMovies>
  );
};

export const DisplayMovies = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & h3 {
    margin-top: 50px;
  }
`;

export default Home;
