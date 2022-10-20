import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useMovies from "../hooks/useMovies";
import YouTube from "react-youtube";
import {
  Movie,
  MoviePoster,
  MovieInfo,
  MoreInfo,
  DisplayMovies,
  MovieCard,
  ContainerMovies,
} from "../Home/UI/style";

import {
  FeaturedWrapper,
  TitleWrapper,
  ButtonTrailer,
  Sinopsis,
} from "./UI/styles";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const Overview = ({ getData, setPlaying, setWatchTrailer }) => {
  const {
    movieId,
    language,
    moreInfo,
    playing,
    watchTrailer,
    textRecommendations,
  } = useMovies();
  const [trailer, setTrailer] = useState(
    `${localStorage.getItem("TrailerKey")}`
  );
  const [overviewDetails, setOverviewDetails] = useState("");
  const [recommendations, setRecommendations] = useState("");

  const { id } = useParams();

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

  useEffect(() => {
    const overviewMovie = async () => {
      try {
        const overviewUrl = await fetch(
          `https://api.themoviedb.org/3/movie/${
            id !== undefined ? id : movieId
          }?api_key=${
            process.env.REACT_APP_API_KEY
          }&language=${language}&append_to_response=videos,recommendations`
        );

        if (overviewUrl.status === 200) {
          const dataOverview = await overviewUrl.json();

          const renderData = dataOverview.recommendations.results.slice(0, 12);
          const renderRecommendations = renderData.filter(
            (poster) => poster.poster_path !== null
          );
          setRecommendations(
            renderRecommendations.map((movie) => (
              <Movie key={movie.id}>
                <MovieCard>
                  {movie.poster_path !== null && (
                    <MoviePoster
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt=""
                    />
                  )}
                  <MovieInfo>
                    <Link to={`/overview/${movie.id}`}>
                      <MoreInfo onClick={() => getData(movie.id)}>
                        {moreInfo}
                      </MoreInfo>
                    </Link>
                    {window.screen.width >= 1024 && (
                      <h3 className="title">{movie.title}</h3>
                    )}
                  </MovieInfo>
                </MovieCard>
              </Movie>
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
            <SwitchTransition>
              <CSSTransition
                key={movieId}
                addEndListener={(node, done) =>
                  node.addEventListener("transitionend", done, false)
                }
                classNames="fade"
              >
                <div className="top">
                  <div className="columns">
                    <FeaturedWrapper>
                      <div>
                        <img
                          alt=""
                          src={`https://image.tmdb.org/t/p/w500/${dataOverview.poster_path}`}
                          className="featured"
                        />
                      </div>

                      <TitleWrapper>
                        <h1>{dataOverview.title}</h1>
                        <Sinopsis className="sinopsis">
                          {dataOverview.overview}
                        </Sinopsis>

                        {trailer !== undefined && (
                          <ButtonTrailer onClick={() => playTrailer()}>
                            {watchTrailer}
                          </ButtonTrailer>
                        )}

                        {playing && (
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
                        )}
                      </TitleWrapper>
                    </FeaturedWrapper>
                  </div>
                </div>
              </CSSTransition>
            </SwitchTransition>
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
      } finally {
        window.scrollTo(0, 0);
      }
    };
    overviewMovie();
  }, [movieId, playing, trailer, language]);
  return (
    <>
      {overviewDetails}
      {recommendations.length !== 0 && (
        <DisplayMovies>
          <h3 className="recommendations-text">{textRecommendations}</h3>
          <ContainerMovies>{recommendations}</ContainerMovies>
        </DisplayMovies>
      )}
    </>
  );
};

export default Overview;
