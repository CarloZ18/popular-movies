import { useEffect, useState, useRef } from "react";
import "./index.css";
import $ from "jquery";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Components/Home";
import MoviesContext from "./Components/context/MoviesContext";
import OverviewMovies from "./Components/Overview";


function App() {
  /*MOVIES*/
  const [movieName, setMovieName] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [textRecommendations, setTextRecommendations] =
    useState("Recommendations");
  const [page, setPage] = useState(1);
  const [language, setLanguage] = useState("en-US");
  const [titleSearch, setTitleSearch] = useState("Search your movie");
  const [moreInfo, setMoreInfo] = useState("More info");
  const [next, setNext] = useState("Next");
  const [previous, setPrevious] = useState("Previous");
  const [checkedLanguage, setCheckedLanguage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posterOverview, setPosterOverview] = useState(null);
  const [titleOverview, setTitleOverview] = useState(null);
  const [overview, setOverview] = useState(null);
  const [filterMovie, setFilterMovie] = useState("");
  const [watchTrailer, setWatchTrailer] = useState("Watch Trailer");
  const [trailer, setTrailer] = useState(null);
  const [trailerText, setTrailerText] = useState("Hide Trailer");
  const [returnText, setReturnText] = useState("Home");
  const [playing, setPlaying] = useState(false);

  const containerRef = useRef();

  const lang = localStorage.getItem("lang");

  const store = {
    pageNum: page,
    movieName: movieName,
    recommendations: recommendations,
    textRecommendations: textRecommendations,
    language: language,
    moreInfo: moreInfo,
    loading: loading,
    posterOverview: posterOverview,
    titleOverview: titleOverview,
    overview: overview,
    filterMovie: filterMovie,
    watchTrailer: watchTrailer,
    trailer: trailer,
    next: next,
    previous: previous,
    titleSearch: titleSearch,
    containerMovies: containerRef,
    checkedLanguage: checkedLanguage,
    returnText: returnText,
    trailerText: trailerText,
    playing: playing,
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

  const getTrailer = async (id) => {
    try {
      setLoading(true);
      const trailerUrl = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=d5cf176c00d61b0b743c13c0e41cd146`
      );
      if (trailerUrl.status === 200) {
        const data3 = await trailerUrl.json();
        if (data3.results) {
          const officialTrailer = data3.results.find(
            (vid) => vid.name === "Official Trailer"
          );
          setTrailer(officialTrailer ? officialTrailer : data3.results[4]);
        }
      } else if (trailerUrl.status === 401) {
        alert("Identificador incorrecto");
      } else if (trailerUrl.status === 404) {
        console.log("No se encuentra la pelicula");
      } else {
        alert("Hubo un error al obtener la pelicula");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getRecommendations = async (id) => {
    try {
      setLoading(true);
      const recommendationsUrl = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=d5cf176c00d61b0b743c13c0e41cd146&language=${language}`
      );
      if (recommendationsUrl.status === 200) {
        const data4 = await recommendationsUrl.json();
        const renderData = data4.results.slice(0, 4);
        const renderRecommendations = renderData.filter(
          (poster) => poster.poster_path !== null
        );
        const recommendationsMovies = renderRecommendations.map(
          (movie) => (
            <div className="card-recommendations" key={movie.id}>
              <img
                className="poster"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt=""
              />

              <div className="info">
                <Link to="/overview">
                  <button
                    className="more-info"
                    onClick={() =>
                      getData(
                        movie.id,
                        movie.poster_path,
                        movie.title,
                        movie.overview
                      )
                    }
                  >
                    {moreInfo}
                  </button>
                </Link>
              </div>
            </div>
          )
        );
        setRecommendations(recommendationsMovies);
      } else if (recommendationsUrl.status === 401) {
        alert("Identificador incorrecto");
      } else if (recommendationsUrl.status === 404) {
        console.log("No se encuentra la pelicula");
      } else {
        alert("Hubo un error al obtener la pelicula");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getData = (id, poster, title, overview) => {
    setPosterOverview(poster);
    setTitleOverview(title);
    setOverview(overview);
    setFilterMovie(filterMovie);
    if (id !== null) {
      getTrailer(id);
      getRecommendations(id);
    }
    window.scrollTo(0, 0);
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
  };

  useEffect(() => {
    const popularMovies = async () => {
      try {
        setLoading(true);
        const moviesUrl = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=d5cf176c00d61b0b743c13c0e41cd146&page=${page}&language=${language}`
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
                  <Link to="/overview" preventScrollReset={true}>
                    <button
                      className="more-info"
                      onClick={() =>
                        getData(
                          movie.id,
                          movie.poster_path,
                          movie.title,
                          movie.overview
                        )
                      }
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
                    <Link to="/overview">
                      <button
                        className="more-info"
                        onClick={() =>
                          getData(
                            movie.id,
                            movie.poster_path,
                            movie.title,
                            movie.overview
                          )
                        }
                      >
                        {moreInfo}
                      </button>
                    </Link>
  
                    <h3 className="title">{movie.title}</h3>
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

    popularMovies();
  }, [page, language, filterMovie]);

  return (
    <MoviesContext.Provider value={store}>
      <Router>
        <Routes>
          <Route
            path="/overview"
            element={
              <OverviewMovies
                playTrailer={playTrailer}
                returnHome={returnHome}
              />
            }
          ></Route>
          <Route
            path="/"
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
