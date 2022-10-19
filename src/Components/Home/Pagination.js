import useMovies from "../hooks/useMovies";
import { MenuPagination, ButtonPagination } from "./UI/style";
const Pagination = ({ changePage }) => {
  const { pageNum, next, previous } = useMovies();

  return (
    <MenuPagination>
      <ButtonPagination id="previous" onClick={changePage}>
        {previous}
      </ButtonPagination>
      <h2>{pageNum}</h2>
      <ButtonPagination id="next" onClick={changePage}>
        {next}
      </ButtonPagination>
    </MenuPagination>
  );
};

export default Pagination;
