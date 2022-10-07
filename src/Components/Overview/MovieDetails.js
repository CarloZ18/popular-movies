
import useMovies from "../hooks/useMovies";

const MovieDetails = ({overviewDetails,recommendations}) => {
    const {textRecommendations } =
    useMovies();

  return (
    <div>
      {overviewDetails}
      {recommendations.length !== 0 ? (
        <div className="container-overview">
          <h3 className="recommendations-text">{textRecommendations}</h3>

          <div className="first-row">{recommendations}</div>
        </div>
      ) : null}
    </div>
  );
};

export default MovieDetails;
