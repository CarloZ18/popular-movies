import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import { Pagination } from "./Pagination";
import { LangProvider } from "../../context/LangContext";

describe("<Pagination/>",()=>{
  let handleClick;

beforeEach(() => {
  handleClick = jest.fn();
  // eslint-disable-next-line testing-library/no-render-in-setup
  render(<LangProvider children={<Pagination changePage={handleClick}/>}/>)
});

test("render component", () => {
  const menuPagination = screen.getByRole("menu-pagination");
  expect(menuPagination).toBeInTheDocument();
});

test("change page", () => {
  const menuPaginationNextButton = screen.getByRole("button-next");
  const menuPaginationPreviousButton = screen.getByRole("button-previous");
  fireEvent.click(menuPaginationNextButton) ||
    fireEvent.click(menuPaginationPreviousButton);
  expect(handleClick).toHaveBeenCalledTimes(1)
});
})
