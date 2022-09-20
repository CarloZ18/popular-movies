import { useEffect, useState, useRef } from "react";
import "./index.css";
import $ from "jquery";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import Home from "./Components/Home";
import MoviesContext from "./Components/context/MoviesContext";
import OverviewMovies from "./Components/Overview";
import ChangeLenguage from "./Components/ChangeLenguage";

function App() {
  /*MOVIES*/
  const [movieName, setMovieName] = useState("");
  const [page, setPage] = useState(1);
  const [lenguage, setLenguage] = useState("en-US");
  const [titleSearch, setTitleSearch] = useState("Search your movie");
  const [moreInfo, setMoreInfo] = useState("More info");
  const [next, setNext] = useState("Next");
  const [previous, setPrevious] = useState("Previous");
  const [checkedLenguage, setCheckedLenguage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posterOverview, setPosterOverview] = useState(null);
  const [titleOverview, setTitleOverview] = useState(null);
  const [overview, setOverview] = useState(null);
  const [filterMovie, setFilterMovie] = useState(null);

  const containerRef = useRef();

  const lang = localStorage.getItem("lang");

  const store = {
    pageNum: page,
    movieName: movieName,
    next: next,
    previous: previous,
    titleSearch: titleSearch,
    containerMovies: containerRef,
    checkedLenguage: checkedLenguage,
  };

  const changeLenguage = () => {
    if (lenguage === "en-US") {
      setLenguage("es-ES");
      setTitleSearch("Busca tu película");
      setMoreInfo("Saber más");
      setNext("Siguiente");
      setPrevious("Anterior");
      setCheckedLenguage(true);
      localStorage.setItem("lang", "es-ES");
    } else {
      setLenguage("en-US");
      setTitleSearch("Search your movie");
      setMoreInfo("More info");
      setNext("Next");
      setPrevious("Previous");
      setCheckedLenguage(false);
      localStorage.setItem("lang", "en-US");
    }
  };

  const popularMovies = async () => {
    try {
      setLoading(true);
      const moviesUrl = await fetch(
        `https://api.themoviedb.org/3/movie/popular/?api_key=d5cf176c00d61b0b743c13c0e41cd146&page=${page}&language=${lenguage}`
      );

      if (moviesUrl.status === 200 && filterMovie === "") {
        const data = await moviesUrl.json();
        console.log(data.results);
        const moviePopular = data.results.map((movie, index) => (
          <div className="movie" key={index}>
            <div className="card">
              <img
                className="poster"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt=""
              />
              <div className="info">
                <NavLink to="/overview">
                  <button
                    className="more-info"
                    onClick={() =>
                      getData(movie.poster_path, movie.title, movie.overview)
                    }
                  >
                    {moreInfo}
                  </button>
                </NavLink>
                <h3 className="title">{movie.title}</h3>
              </div>
            </div>
          </div>
        ));
        setMovieName(moviePopular);
      } else if (moviesUrl.status === 200 && filterMovie !== "") {
        console.log("render");
        const search = filterMovie;
        setLoading(true);
        const searchUrl = await fetch(
          `https://api.themoviedb.org/3/search/movie/?api_key=d5cf176c00d61b0b743c13c0e41cd146&page=${page}&language=${lenguage}&query=${search}&include_adult=false`
        );
        if (searchUrl.status === 200) {
          const data2 = await searchUrl.json();
          const filterPopularMovies = data2.results.map((movie, index) => (
            <div className="movie" key={index}>
              <div className="card">
                <img
                  className="poster"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt=""
                />
                <div className="info">
                  <NavLink to="/overview">
                    <button
                      className="more-info"
                      onClick={() =>
                        getData(movie.poster_path, movie.title, movie.overview)
                      }
                    >
                      {moreInfo}
                    </button>
                  </NavLink>

                  <h3 className="title">{movie.title}</h3>
                </div>
              </div>
            </div>
          ));
          setMovieName(filterPopularMovies);
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

  const changePage = (e) => {
    if (e.target.id === "previous" && page > 1) {
      $(".Popular-Movies").animate({ opacity: 0 }, 500, function () {
        setPage(page - 1);
        $(this).animate({ opacity: 1 }, 500);
      });
    } else if (e.target.id === "next" && page < 1000) {
      $(".Popular-Movies").animate({ opacity: 0 }, 500, function () {
        setPage(page + 1);
        $(this).animate({ opacity: 1 }, 500);
      });
    }
  };

  const getData = (poster, title, overview) => {
    setPosterOverview(poster);
    setTitleOverview(title);
    setOverview(overview);
    setFilterMovie("");
  };

  const handleChange = (event) => {
    setFilterMovie(event.target.value);
  };

  useEffect(() => {
    if (lang === "es-ES") {
      setLenguage("es-ES");
      setTitleSearch("Busca tu película");
      setMoreInfo("Saber más");
      setNext("Siguiente");
      setPrevious("Anterior");
      setCheckedLenguage(true);
    } else {
      setLenguage("en-US");
      setTitleSearch("Search your movie");
      setMoreInfo("More info");
      setNext("Next");
      setPrevious("Previous");
      setCheckedLenguage(false);
    }
    popularMovies();
  }, [page, lenguage, filterMovie]);

  return (
    <MoviesContext.Provider value={store}>
      <Router>
        <ChangeLenguage changeLenguage={changeLenguage} />
        <Routes>
          <Route
            path="/overview"
            element={
              <OverviewMovies
                poster={posterOverview}
                title={titleOverview}
                overview={overview}
              />
            }
          ></Route>
          <Route
            path="/"
            element={
              <Home
                handleChange={handleChange}
                changeLenguage={changeLenguage}
                loading={loading}
                changePage={changePage}
              />
            }
          ></Route>
        </Routes>
      </Router>
    </MoviesContext.Provider>
  );
}

export default App;
