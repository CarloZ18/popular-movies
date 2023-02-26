import { FilterMovie } from "./FilterMovie";
import Loader from "../Loader/Loader";
import Movies from "./Movies";
import { Pagination } from "./Pagination";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { langContext } from "../../context/LangContext";

const Home = ({ getData, page, filterMovie, searchMovie, changePage }) => {
  const [movieName, setMovieName] = useState([]);
  const [loading, setLoading] = useState(false);
  const idiom= useContext(langContext);


  useEffect(() => {
    const popularMovies = async () => {
      try {
        setLoading(true);
        const moviesUrl = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=${idiom.language}&page=${page}&include_adult=false`
        );

        if (moviesUrl.status === 200 && filterMovie === "") {
          const data = await moviesUrl.json();

          const renderMovies = data.results.filter(
            (poster) => poster.poster_path !== null
          );

          setMovieName(renderMovies);
        } else if (moviesUrl.status === 200 && filterMovie !== "") {
          console.log(1);
          const search = filterMovie;
          setLoading(true);
          const searchUrl = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&query=${search}&include_adult=false`
          );
          if (searchUrl.status === 200) {
            const data2 = await searchUrl.json();

            const renderSearch = data2.results.filter(
              (poster) => poster.poster_path !== null
            );
            setMovieName(renderSearch);
          } else if (moviesUrl.status === 401) {
            alert("Identificador incorrecto");
          } else if (moviesUrl.status === 404) {
            console.log("No se encuentra la pelicula");
          } else {
            alert("Hubo un error al obtener la pelicula");
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    popularMovies();
  }, [idiom.language, page, filterMovie]);

  return (
    <DisplayMovies role="display-home">
      <FilterMovie searchMovie={searchMovie} />
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
            <Movies getData={getData} movieName={movieName} />
          )}
        </CSSTransition>
      </SwitchTransition>
      <Pagination changePage={changePage} page={page} />
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
