import styled from "styled-components";

/*NAVBAR*/
const Return = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 20px;
  background-color: var(--primary-color);
  color: #fff;
`;
const TextReturn = styled.h3`
  margin-left: 15px;
  font-weight: 600;
  text-decoration: none;
`;

/* CHANGE LANGUAGE */
const RowLanguage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 50px;
  }
`;

const ToggleButtonLanguage = styled.div`
  display: table-cell;
  position: relative;
  width: 100px;
  box-sizing: border-box;
  cursor: pointer;
`;

const ButtonCoverLanguage = styled.div`
  height: 35px;
  margin: 20px;
  background-color: #fff;
  border-radius: 20px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  &:before {
    counter-increment: button-counter;
    content: counter(button-counter);
    color: #d7e3e3;
    font-size: 12px;
    line-height: 1;
    padding: 5px;
  }
`;

const KnobsLanguage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  &:before {
    position: absolute;
    top: 4px;
    width: 20px;
    height: 10px;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    line-height: 1;
    padding: 9px 4px;
    border-radius: 20px;
    content: "";
    left: 4px;
    background-color: var(--secondary-color);
  }
  &:after {
    position: absolute;
    top: 4px;
    width: 20px;
    height: 10px;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    line-height: 1;
    padding: 9px 4px;
    border-radius: 20px;
    content: "ES";
    right: 2px;
    color: #4e4e4e;
  }
`;

const LayerLanguage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: 0.3s ease all;
  z-index: 1;
  border-radius: 20px;
`;

const TranslateLanguage = styled.div`
  border-radius: 50px;
`;

const SpanLanguage = styled.span`
  position: absolute;
  top: 4px;
  width: 20px;
  height: 10px;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  line-height: 1;
  padding: 9px 4px;
  border-radius: 20px;
  display: inline-block;
  left: 7px;
  color: #fff;
  z-index: 1;
`;

const CheckboxLanguage = styled.input`
  position: relative;
  padding: 0;
  margin: 0;
  top: -20px;
  opacity: 0;
  cursor: pointer;
  z-index: 3;
  &:checked + ${KnobsLanguage} ${SpanLanguage} {
    color: #4e4e4e;
  }
  &:checked + ${KnobsLanguage}:before {
    left: 30px;
    background-color: var(--primary-color);
  }
  &:checked + ${KnobsLanguage}:after {
    color: #fff;
  }
  &:checked ~ ${LayerLanguage} {
    color: #fff;
  }
`;

/*MOVIES*/

const DisplayMovies = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & h3 {
    margin-top: 50px;
  }
`;

const ContainerMovies = styled.div`
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

const Movie = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const MoviePoster = styled.img`
  width: 100%;
  height: 100%;
  transition: all 1s;
`;

const MovieInfo = styled.div`
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

const MovieCard = styled.div`
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

const MoreInfo = styled.button`
  height: 50px;
  width: 100px;
  border-radius: 10px;
  background-color: #24174485;
  border-color: #12bba4;
  border-style: solid;
  color: #fff;
  font-size: 1em;
  font-weight: 700;
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

/*SEARCH MOVIES*/

const FormSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 15px;
  transition: all 1s;
  width: 400px;
  height: 50px;
  background: var(--primary-color);
  box-sizing: border-box;
  border-radius: 25px;
  padding: 5px;
  cursor: pointer;
  border: #000;
  @media (max-width: 768px) {
    width: 250px;
  }
`;

const InputSearch = styled.input`
  width: 100%;
  height: 40px;
  line-height: 20px;
  outline: 0;
  border: 0;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 1em;
  border-radius: 20px;
  padding: 0 20px;
  display: block;
`;

/*PAGINATION*/

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

export {
  Return,
  TextReturn,
  CheckboxLanguage,
  ButtonCoverLanguage,
  TranslateLanguage,
  RowLanguage,
  ToggleButtonLanguage,
  LayerLanguage,
  KnobsLanguage,
  SpanLanguage,
  DisplayMovies,
  ContainerMovies,
  FormSearch,
  InputSearch,
  MenuPagination,
  ButtonPagination,
  Movie,
  MoviePoster,
  MovieInfo,
  MovieCard,
  MoreInfo,
};
