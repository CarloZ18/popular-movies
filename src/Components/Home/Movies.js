import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Movies = ({ getData, movieName }) => {
  return (
    <ContainerMovies role="container-movies">
      {movieName.map((movie) => (
        <Movie role={"movie"} key={movie.id}>
          <MovieCard>
            {movie.poster_path !== null ? (
              <MoviePoster
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt=""
              />
            ) : null}
            <MovieInfo>
              <Link to={`/overview/${movie.id}`}>
                <MoreInfo onClick={() => getData(movie.id)}>
                  <FormattedMessage
                    id="text-watchTrailer"
                    defaultMessage="Watch Trailer"
                  />
                </MoreInfo>
              </Link>
              {window.screen.width >= 1024 && (
                <h3 className="title">{movie.title}</h3>
              )}
            </MovieInfo>
          </MovieCard>
        </Movie>
      ))}
    </ContainerMovies>
  );
};

export const ContainerMovies = styled.div`
  margin: 40px auto 100px auto;
  width: 80%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5vw;
  @media (max-width: 768px) {
    padding: 20px;
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Movie = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
export const MoviePoster = styled.img`
  width: 100%;
  height: 100%;
  transition: all 1s;
`;

export const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  height: 230px;
  width: 200px;
  font-size: 1em;
  z-index: 2;
  color: white;
  opacity: 0;
  transform: translateY(70px);
  transition: 0.5s;
  @media (max-width: 768px) {
    font-size: 1em;
    height: 130px;
    width: 200px;
  }
`;

export const MovieCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 15px;
  border-color: #fff;
  border-style: solid;
  border-width: 5px;
  overflow: hidden;
  &:hover ${MoviePoster} {
    transform: scale(1.1);
    transition: all 1s;
  }
  &:before {
    content: "";
    position: absolute;
    width: calc(100% - 84.5%);
    height: 300px;
    border-radius: 13px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), #000);
    z-index: 1;
    transition: 0.5s;
    opacity: 0;
  }
  &:hover:before {
    opacity: 1;
  }
  &:hover ${MovieInfo} {
    opacity: 1;
    transform: translateY(10px);
  }
  @media (max-width: 768px) {
    &:before {
      width: calc(100% - 68%);
    }
    &:hover ${MovieInfo} {
      transform: translateY(-80px);
    }
  }
`;

export const MoreInfo = styled.button`
  height: 50px;
  width: 100px;
  border-radius: 10px;
  background-color: #24174485;
  border-color: #12bba4;
  border-style: solid;
  color: #fff;
  font-size: 1em;
  font-weight: 700;
  list-style-type: none;
  cursor: pointer;

  transition: all 0.5s;
  &:hover {
    background: #12bba4;
  }
  @media (max-width: 768px) {
    width: 100px;
    height: 50px;
  }
`;

export default Movies;
