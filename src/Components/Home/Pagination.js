import { FormattedMessage } from "react-intl";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import styled from "styled-components";
const Pagination = ({ changePage, page }) => {
  return (
    <MenuPagination role="menu-pagination">
      <ButtonPagination
        role="button-previous"
        id="previous"
        onClick={changePage}
      >
        <FormattedMessage id="text-previous" defaultMessage="Previous" />
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
      <ButtonPagination role="button-next" id="next" onClick={changePage}>
        <FormattedMessage id="text-next" defaultMessage="Next" />
      </ButtonPagination>
    </MenuPagination>
  );
};

const MenuPagination = styled.div`
  position: fixed;
  bottom: 0;
  background: #100a1f;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 10px;
  z-index: 2;
`;
const ButtonPagination = styled.button`
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 50px;
  width: 200px;
  background: #241744;
  color: #fff;
  border-radius: 100px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  transition: 0.3s ease all;
  &:hover {
    background: #12bba4;
  }
  &:active {
    transform: translateY(2px);
  }
`;

export { Pagination, MenuPagination, ButtonPagination };
