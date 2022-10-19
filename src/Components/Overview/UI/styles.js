import styled from "styled-components";

const FeaturedWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    & img {
      width: 300px;
    }
  }
`;

const TitleWrapper = styled.div`
  width: 90%;
  & h1 {
    width: 70%;
    margin: 20px 0px;
    font-size: 50px;
  }
  @media (max-width: 768px) {
    text-align: center;
    left: 0;
    & h1 {
      font-size: 32px !important;
      width: 100%;
    }
  }
`;

const Sinopsis = styled.p`
  margin-bottom: 30px;
`;

const ButtonTrailer = styled.button`
  height: 50px;
  width: 150px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: #24174485;
  border-color: var(--secondary-color);
  border-style: solid;
  color: #fff;
  font-size: 1em;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    cursor: pointer;
    background-color: var(--secondary-color);
  }
`;
export { FeaturedWrapper, TitleWrapper, ButtonTrailer, Sinopsis };
