import YouTube from "react-youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import useMovies from "../hooks/useMovies";
import { NavLink } from "react-router-dom";

const OverviewMovies = ({returnHome,playTrailer}) => {
  const {
    recommendations,
    textRecommendations,
    overview,
    titleOverview,
    posterOverview,
    watchTrailer,
    trailer,
    returnText,
    playing
  } = useMovies();

  return (
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
                src={`https://image.tmdb.org/t/p/w500/${posterOverview}`}
                className="featured"
              />
            </div>

            <div className="title_wrapper">
              <h1 className="title-overview">{titleOverview}</h1>
              <p className="sinopsis">{overview}</p>

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
                  videoId={trailer.key}
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

      {recommendations.length !== 0 ? (
        <div className="container-overview">
          <h3 className="recommendations-text">{textRecommendations}</h3>

          <div className="first-row">{recommendations}</div>
        </div>
      ) : null}
    </>
  );
};

export default OverviewMovies;
