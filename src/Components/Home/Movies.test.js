import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import Movies from "./Movies";
import { LangProvider } from "../../context/LangContext";


describe("<Movies/>", () => {
  const mockApi = [
    {
      id: 505642,
      title: "Black Panther: Wakanda Forever",
      overview:
        "Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death.  As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.",
      poster_path: "/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
    },
  ];
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<Movies />);
  });

  test("render component", () => {
    const containerMovies = screen.getByRole("container-movies");
    expect(containerMovies).toBeInTheDocument();
  });
});
