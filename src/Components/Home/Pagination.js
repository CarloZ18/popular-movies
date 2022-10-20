import { SwitchTransition, CSSTransition } from "react-transition-group";
import useMovies from "../hooks/useMovies";
import { MenuPagination, ButtonPagination } from "./UI/style";
const Pagination = ({ changePage }) => {
  const { page, next, previous } = useMovies();

  return (
    <MenuPagination>
      <ButtonPagination id="previous" onClick={changePage}>
        {previous}
      </ButtonPagination>
      <SwitchTransition>
        <CSSTransition
          key={page}
          addEndListener={(node, done) =>
            node.addEventListener("transitionend", done, false)
          }
          classNames="fade"
        >
          <h2> {page} </h2>
        </CSSTransition>
      </SwitchTransition>
      <ButtonPagination id="next" onClick={changePage}>
        {next}
      </ButtonPagination>
    </MenuPagination>
  );
};

export default Pagination;
