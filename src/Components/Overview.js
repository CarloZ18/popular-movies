import YouTube from "react-youtube";

const OverviewMovies = ({ poster, title, overview }) => {
  return (
    <>
      <div className="top">
        <div className="columns">
          <div className="featured_wrapper">
            <div>
              <img
                alt=""
                src={`https://image.tmdb.org/t/p/w500/${poster}`}
                className="featured"
              />
            </div>
            <div className="title_wrapper">
              <h1 className="title-overview">{title}</h1>
              <p className="sinopsis">{overview}</p>
              <button className="button-overview">Watch Trailer</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-overview">
        <p className="recommendations-text">Recommendations</p>
        <div className="first-row">
          <div className="column is-one-quarter">
            <img
              alt=""
              className="img-overview"
              src="https://raw.githubusercontent.com/brixiobodino/coffeholic/main/image1.PNG"
            />
          </div>
          <div className="column is-one-quarter">
            <img
              alt=""
              className="img-overview"
              src="https://raw.githubusercontent.com/brixiobodino/coffeholic/main/image2.PNG"
            />
          </div>
          <div className="column is-one-quarter">
            <img
              alt=""
              className="img-overview"
              src="https://raw.githubusercontent.com/brixiobodino/coffeholic/main/img3.PNG"
            />
          </div>
          <div className="column is-one-quarter">
            <img
              alt=""
              className="img-overview"
              src="https://raw.githubusercontent.com/brixiobodino/coffeholic/main/img4.PNG"
            />
          </div>
        </div>
        <div className="second-row">
          <div className="column is-one-quarter">
            <img
              alt=""
              className="img-overview"
              src="https://raw.githubusercontent.com/brixiobodino/coffeholic/main/img5.PNG"
            />
          </div>
          <div className="column is-one-quarter">
            <img
              alt=""
              className="img-overview"
              src="https://raw.githubusercontent.com/brixiobodino/coffeholic/main/img6.PNG"
            />
          </div>
          <div className="column is-one-quarter">
            <img
              alt=""
              className="img-overview"
              src="https://raw.githubusercontent.com/brixiobodino/coffeholic/main/img7.PNG"
            />
          </div>
          <div className="column is-one-quarter">
            <img
              alt=""
              className="img-overview"
              src="https://raw.githubusercontent.com/brixiobodino/coffeholic/main/img8.PNG"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewMovies;
