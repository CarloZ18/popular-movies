import { useEffect, useState, useRef } from "react";
import "./index.css";
import $ from "jquery";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import MoviesContext from "./Components/context/MoviesContext";
import Overview from "./Components/Overview/Overview";

function App() {
  /*MOVIES*/
  const [movieName, setMovieName] = useState("");
  const [textRecommendations, setTextRecommendations] =
    useState("Recommendations");
  const [page, setPage] = useState(1);
  const [language, setLanguage] = useState(`${localStorage.getItem("lang")}`);
  const [titleSearch, setTitleSearch] = useState("Search your movie");
  const [moreInfo, setMoreInfo] = useState(
    language === "en-US" ? "More info" : "Saber más"
  );
  const [next, setNext] = useState("Next");
  const [previous, setPrevious] = useState("Previous");
  const [checkedLanguage, setCheckedLanguage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterMovie, setFilterMovie] = useState("");
  const [watchTrailer, setWatchTrailer] = useState(
    language === "en-US" ? "Watch Trailer" : "Ver Trailer"
  );
  const [trailerText, setTrailerText] = useState("Hide Trailer");
  const [returnText, setReturnText] = useState(
    language === "en-US" ? "Home" : "Inicio"
  );
  const [playing, setPlaying] = useState(false);
  const [movieId, setMovieId] = useState(`${localStorage.getItem("ID")}`);

  const containerRef = useRef();

  const lang = localStorage.getItem("lang");

  const store = {
    pageNum: page,
    movieName: movieName,
    textRecommendations: textRecommendations,
    language: language,
    moreInfo: moreInfo,
    loading: loading,
    watchTrailer: watchTrailer,
    next: next,
    previous: previous,
    titleSearch: titleSearch,
    containerMovies: containerRef,
    checkedLanguage: checkedLanguage,
    returnText: returnText,
    trailerText: trailerText,
    playing: playing,
    movieId: movieId,
  };

  const changeLanguage = () => {
    if (language === "en-US") {
      setLanguage("es-ES");
      setTitleSearch("Busca tu película");
      setMoreInfo("Saber más");
      setNext("Siguiente");
      setPrevious("Anterior");
      setCheckedLanguage(true);
      setWatchTrailer("Ver Trailer");
      setTextRecommendations("Recomendaciones");
      setReturnText("Inicio");
      setTrailerText("Ocultar Trailer");
      localStorage.setItem("lang", "es-ES");
    } else {
      setLanguage("en-US");
      setTitleSearch("Search your movie");
      setMoreInfo("More info");
      setNext("Next");
      setPrevious("Previous");
      setCheckedLanguage(false);
      setWatchTrailer("Watch Trailer");
      setTextRecommendations("Recommendations");
      setReturnText("Home");
      setTrailerText("Hide Trailer");
      localStorage.setItem("lang", "en-US");
    }
  };

  const changePage = (e) => {
    if (e.target.id === "previous" && page > 1) {
      $(".display-movies").animate({ opacity: 0 }, 500, function () {
        setPage(page - 1);
        window.scrollTo(0, 0);
        $(this).animate({ opacity: 1 }, 500);
      });
    } else if (e.target.id === "next" && page < 1000) {
      $(".display-movies").animate({ opacity: 0 }, 500, function () {
        setPage(page + 1);
        window.scrollTo(0, 0);
        $(this).animate({ opacity: 1 }, 500);
      });
    }
  };

  const getData = (id) => {
    setMovieId(id);
    window.scrollTo(0, 0);
    localStorage.setItem("ID", `${id}`);
  };

  const playTrailer = () => {
    if (playing === false) {
      setPlaying(true);
      language === "es-ES"
        ? setWatchTrailer("Ocultar Trailer")
        : setWatchTrailer("Hide Trailer");
    } else {
      setPlaying(false);
      language === "es-ES"
        ? setWatchTrailer("Ver Trailer")
        : setWatchTrailer("Watch Trailer");
    }
  };

  const returnHome = () => {
    setPlaying(false);
    language === "es-ES"
      ? setWatchTrailer("Ver Trailer")
      : setWatchTrailer("Watch Trailer");
  };

  const handleChange = (event) => {
    setFilterMovie(event.target.value);
    if(page !== 1){
      setPage(1)
    }
  };

  useEffect(() => {
    if (lang === "es-ES") {
      setLanguage("es-ES");
      setTitleSearch("Busca tu película");
      setMoreInfo("Saber más");
      setNext("Siguiente");
      setPrevious("Anterior");
      setWatchTrailer("Ver Trailer");
      setTextRecommendations("Recomendaciones");
      setReturnText("Inicio");
      setCheckedLanguage(true);
    } else {
      setLanguage("en-US");
      setTitleSearch("Search your movie");
      setMoreInfo("More info");
      setNext("Next");
      setPrevious("Previous");
      setWatchTrailer("Watch Trailer");
      setTextRecommendations("Recommendations");
      setReturnText("Home");
      setCheckedLanguage(false);
    }

    const popularMovies = async () => {
      try {
        setLoading(true);
        const moviesUrl = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=d5cf176c00d61b0b743c13c0e41cd146&page=${page}&language=${language}&include_adult=false`
        );

        if (moviesUrl.status === 200 && filterMovie === "") {
          const data = await moviesUrl.json();

          const renderMovies = data.results.filter(
            (poster) => poster.poster_path !== null
          );
          const moviePopular = renderMovies.map((movie) => (
            <div className="movie" key={movie.id}>
              <div className="card">
                {movie.poster_path !== null ? (
                  <img
                    className="poster"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt=""
                  />
                ) : null}
                <div className="info">
                  <Link to={`/overview/${movie.id}`}>
                    <button
                      className="more-info"
                      onClick={() => getData(movie.id)}
                    >
                      {moreInfo}
                    </button>
                  </Link>
                  {window.screen.width >= 1024 ? (
                    <h3 className="title">{movie.title}</h3>
                  ) : null}
                </div>
              </div>
            </div>
          ));

          setMovieName(moviePopular);
        } else if (moviesUrl.status === 200 && filterMovie !== "") {
          setPlaying(false);
          const search = filterMovie;
          setLoading(true);
          const searchUrl = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=d5cf176c00d61b0b743c13c0e41cd146&page=${page}&language=${language}&query=${search}&include_adult=false`
          );
          if (searchUrl.status === 200) {
            const data2 = await searchUrl.json();

            const renderSearch = data2.results.filter(
              (poster) => poster.poster_path !== null
            );

            const searchPopularMovies = renderSearch.map((movie) => (
              <div className="movie" key={movie.id}>
                <div className="card">
                  <img
                    className="poster"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt=""
                  />

                  <div className="info">
                    <Link to={`/overview/${movie.id}`}>
                      <button
                        className="more-info"
                        onClick={() => getData(movie.id)}
                      >
                        {moreInfo}
                      </button>
                    </Link>

                    {window.screen.width >= 1024 ? (
                      <h3 className="title">{movie.title}</h3>
                    ) : null}
                  </div>
                </div>
              </div>
            ));
            setMovieName(searchPopularMovies);
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
  }, [page, language, filterMovie]);

  return (
    <MoviesContext.Provider value={store}>
      <Router>
        <Routes>
          <Route
            path={`/overview/:id`}
            element={
              <Overview
                playTrailer={playTrailer}
                returnHome={returnHome}
                getData={getData}
              />
            }
          ></Route>
          <Route
            path="/"
            exact
            element={
              <Home
                handleChange={handleChange}
                changeLanguage={changeLanguage}
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
