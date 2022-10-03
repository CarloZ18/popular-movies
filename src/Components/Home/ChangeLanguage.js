import useMovies from "../hooks/useMovies";

const ChangeLanguage = ({changeLanguage}) => {

  const {checkedLanguage} = useMovies();
    return (
    <div className="row">
      <div className="toggle-button-cover">
        <div className="button-cover">
          <div className="translate" id="translate-id" onClick={changeLanguage}>
            <input type="checkbox" className="checkbox" checked={checkedLanguage} onChange={changeLanguage}  />
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

export default ChangeLanguage;
