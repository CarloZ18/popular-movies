import useMovies from "./Movies";

const Pagination = ({changePage}) => {

   const {pageNum, next,previous} = useMovies();

    return (
     <div className="pagination">
        <button id="previous" onClick={changePage}>{previous}</button>
        <h2>{pageNum}</h2>
        <button id="next" onClick={changePage}>{next}</button>
     </div>
    )
  };
  
  export default Pagination;
  