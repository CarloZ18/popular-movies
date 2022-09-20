import useMovies from "./hooks/useMovies";

const ChangeLenguage = ({changeLenguage}) => {

  const {checkedLenguage} = useMovies();
    return (
    <div className="row">
      <div className="toggle-button-cover">
        <div className="button-cover">
          <div className="translate" id="translate-id" onClick={changeLenguage}>
            <input type="checkbox" className="checkbox" checked={checkedLenguage} onChange={changeLenguage} />
            <div className="knobs">
              <span>EN</span>
            </div>
            <div className="layer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeLenguage;
