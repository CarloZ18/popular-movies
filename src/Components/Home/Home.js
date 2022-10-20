import FilterMovie from "./FilterMovie";
import Loader from "../Loader/Loader";
import Movies from "./Movies";
import Pagination from "./Pagination";
import useMovies from "../hooks/useMovies";
import { DisplayMovies } from "./UI/style";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const Home = ({ changePage, searchMovie, changeLanguage }) => {
  const { page, movieName, loading } = useMovies();
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
          {loading ? <Loader /> : <Movies movieName={movieName} />}
        </CSSTransition>
      </SwitchTransition>
      <Pagination changePage={changePage} />
    </DisplayMovies>
  );
};

export default Home;
