import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useMovies from "../hooks/useMovies";
import YouTube from "react-youtube";
import {
  Movie,
  MoviePoster,
  MovieInfo,
  MoreInfo,
  MovieCard,
  ContainerMovies,
} from "../Home/Movies";

import { DisplayMovies } from "../Home/Home";

import { CSSTransition, SwitchTransition } from "react-transition-group";
import styled from "styled-components";
import { langContext } from "../../context/LangContext";
import { FormattedMessage } from "react-intl";

const Overview = ({ getData, setPlaying }) => {
  const { movieId, playing } = useMovies();
  const [trailer, setTrailer] = useState(
    `${localStorage.getItem("TrailerKey")}`
  );
  const [overviewDetails, setOverviewDetails] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const { changeLanguageOverviewTrailer, language, watchTrailerOverview } =
    useContext(langContext);

  const { id } = useParams();

  const playTrailer = () => {
    if (playing === false) {
      setPlaying(true);
      changeLanguageOverviewTrailer(playing, language);
    } else {
      setPlaying(false);
      changeLanguageOverviewTrailer(playing, language);
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
                        <FormattedMessage
                          id="text-moreInfo"
                          defaultMessage="More info"
                        />
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
                            {watchTrailerOverview}
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
  }, [movieId, playing, trailer,language,watchTrailerOverview]);
  return (
    <>
      {overviewDetails}
      {recommendations.length !== 0 && (
        <DisplayMovies>
          <h3 className="recommendations-text">
            <FormattedMessage
              id="text-recommendations"
              defaultMessage="Recommendations"
            />
          </h3>
          <ContainerMovies>{recommendations}</ContainerMovies>
        </DisplayMovies>
      )}
    </>
  );
};

export const FeaturedWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    & img {
      width: 300px;
    }
  }
`;

export const TitleWrapper = styled.div`
  width: 90%;
  & h1 {
    width: 70%;
    margin: 20px 0px;
    font-size: 50px;
  }
  @media (max-width: 768px) {
    text-align: center;
    left: 0;
    & h1 {
      font-size: 32px !important;
      width: 100%;
    }
  }
`;

export const Sinopsis = styled.p`
  margin-bottom: 30px;
`;

export const ButtonTrailer = styled.button`
  height: 50px;
  width: 150px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: #24174485;
  border-color: var(--secondary-color);
  border-style: solid;
  color: #fff;
  font-size: 1em;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    cursor: pointer;
    background-color: var(--secondary-color);
  }
`;

export default Overview;
