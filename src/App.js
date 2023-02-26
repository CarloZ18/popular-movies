import { useState } from "react";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import MoviesContext from "./context/MoviesContext";
import Overview from "./Components/Overview/Overview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useLocalStorage } from "./Components/hooks/useLocalStorage";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";

function App() {
  const [page, setPage] = useState(1);
  const [filterMovie, setFilterMovie] = useState("");
  const [playing, setPlaying] = useState(false);
  const [movieId, setMovieId] = useLocalStorage("ID", "");

  const store = {
    playing: playing,
    movieId:movieId
  };

  const getData = (id) => {
    setMovieId(id);
  };

  const returnHome = () => {
    setPlaying(false);
    setFilterMovie("");
    setMovieId("");
    setPage(1);
    if (filterMovie !== "" && movieId === "") {
      setFilterMovie("");
    }
  };

  const changePage = (e) => {
    if (e.target.id === "previous" && page > 1) {
      setPage(page - 1);
    } else if (e.target.id === "next" && page < 1000) {
      setPage(page + 1);
    }
  };

  const searchMovie = (event) => {
   setTimeout(() => {
    setFilterMovie(event.target.value);
    if (page !== 1) {
      setPage(1);
    }
    },1000)
  };



  return (
      <MoviesContext.Provider value={store}>
        <Router>
          <NavLink to="/">
            <Return onClick={returnHome}>
              <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
              <TextReturn>
                <FormattedMessage id="return-text" defaultMessage="Home" />
              </TextReturn>
            </Return>
          </NavLink>
          <Routes>
            <Route
              path={`/overview/:id`}
              element={
                <Overview
                  setPlaying={setPlaying}
                  getData={getData}
                />
              }
            ></Route>

            <Route
              path="/"
              exact
              element={
                <Home
                  getData={getData}
                  searchMovie={searchMovie}
                  changePage={changePage}
                  page={page}
                  filterMovie={filterMovie}
                />
              }
            ></Route>
          </Routes>
        </Router>
      </MoviesContext.Provider>
  );
}

export const Return = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 20px;
  background-color: var(--primary-color);
  color: #fff;
`;
export const TextReturn = styled.h3`
  margin-left: 15px;
  font-weight: 600;
  text-decoration: none;
`;

export default App;
