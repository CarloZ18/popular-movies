import { useContext } from "react";
import styled from "styled-components";
import { langContext } from "../../context/LangContext";
const ChangeLanguage = ({idiom}) => {
   idiom = useContext(langContext);

  return (
    <RowLanguage role="container-language">
      <ToggleButtonLanguage>
        <ButtonCoverLanguage>
          <TranslateLanguage
            role="div-translate"
            className="translate"
            id="translate-id"
            onClick={() => idiom.changeLanguage()}
          >
            <CheckboxLanguage
              type="checkbox"
              checked={idiom.checkedLanguage}
              onChange={() => idiom.changeLanguage()}
            />
            <KnobsLanguage>
              <SpanLanguage>EN</SpanLanguage>
            </KnobsLanguage>
            <LayerLanguage></LayerLanguage>
          </TranslateLanguage>
        </ButtonCoverLanguage>
      </ToggleButtonLanguage>
    </RowLanguage>
  );
};

export const RowLanguage = styled.div`
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

export const ToggleButtonLanguage = styled.div`
  display: table-cell;
  position: relative;
  width: 100px;
  box-sizing: border-box;
  cursor: pointer;
`;

export const ButtonCoverLanguage = styled.div`
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

export const KnobsLanguage = styled.div`
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

export const LayerLanguage = styled.div`
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

export const TranslateLanguage = styled.div`
  border-radius: 50px;
`;

export const SpanLanguage = styled.span`
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

export const CheckboxLanguage = styled.input`
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

export default ChangeLanguage;
