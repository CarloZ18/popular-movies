import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import useMovies from "../hooks/useMovies";
import Loader from "../Loader/Loader";
import MovieDetails from "./MovieDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import YouTube from "react-youtube";

const Overview = ({ getData, playTrailer, returnHome }) => {
  const {
    loading,
    movieId,
    returnText,
    language,
    moreInfo,
    playing,
    watchTrailer,
  } = useMovies();
  const [trailer, setTrailer] = useState(
    `${localStorage.getItem("TrailerKey")}`
  );
  const [overviewDetails, setOverviewDetails] = useState("");
  const [recommendations, setRecommendations] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const overviewMovie = async () => {
      try {
        const overviewUrl = await fetch(
          `https://api.themoviedb.org/3/movie/${
            id !== undefined ? id : movieId
          }?api_key=d5cf176c00d61b0b743c13c0e41cd146&language=${language}&append_to_response=videos,recommendations`
        );

        if (overviewUrl.status === 200) {
          const dataOverview = await overviewUrl.json();

          const renderData = dataOverview.recommendations.results.slice(0, 12);
          const renderRecommendations = renderData.filter(
            (poster) => poster.poster_path !== null
          );
          setRecommendations(
            renderRecommendations.map((movie) => (
              <div className="card-recommendations" key={movie.id}>
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
                </div>
              </div>
            ))
          );

          if (dataOverview.videos.results.length !== 0) {
            const officialTrailer = dataOverview.videos.results.find(
              (vid) => vid.name === "Official Trailer"
            );
            setTrailer(
              officialTrailer
                ? officialTrailer.key
                : dataOverview.videos.results[
                    dataOverview.videos.results.length - 1
                  ].key
            );

            localStorage.setItem(
              "TrailerKey",
              `${
                officialTrailer
                  ? officialTrailer.key
                  : dataOverview.videos.results[
                      dataOverview.videos.results.length - 1
                    ].key
              }`
            );
          } else {
            setTrailer(undefined);
          }

          setOverviewDetails(
            <>
              <NavLink to="/">
                <div className="return" onClick={returnHome}>
                  <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                  <h3 className="text-return">{returnText}</h3>
                </div>
              </NavLink>

              <div className="top">
                <div className="columns">
                  <div className="featured_wrapper">
                    <div>
                      <img
                        alt=""
                        src={`https://image.tmdb.org/t/p/w500/${dataOverview.poster_path}`}
                        className="featured"
                      />
                    </div>

                    <div className="title_wrapper">
                      <h1 className="title-overview">{dataOverview.title}</h1>
                      <p className="sinopsis">{dataOverview.overview}</p>

                      {trailer !== undefined ? (
                        <button
                          className="button-overview"
                          onClick={() => playTrailer()}
                        >
                          {watchTrailer}
                        </button>
                      ) : null}

                      {playing ? (
                        <YouTube
                          videoId={trailer}
                          opts={{
                            width: "100%",
                            height: "380px",
                            playerVars: {
                              autoplay: 1,
                              controls: 1,
                              cc_load_policy: 0,
                              fs: 1,
                              iv_load_policy: 0,
                              modestbranding: 0,
                              rel: 0,
                            },
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        } else if (overviewUrl.status === 401) {
          alert("Identificador incorrecto");
        } else if (overviewUrl.status === 404) {
          console.log("No se encuentra la pelicula");
        } else {
          alert("Hubo un error al obtener la pelicula");
        }
      } catch (error) {
        console.log(error);
      }
    };
    overviewMovie();
  }, [movieId, playing, trailer, language]);
  return (
    <div className="display-movies">
      {loading ? (
        <Loader />
      ) : (
        <MovieDetails
          overviewDetails={overviewDetails}
          recommendations={recommendations}
        />
      )}
    </div>
  );
};

export default Overview;
