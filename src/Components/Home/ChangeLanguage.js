import useMovies from "../hooks/useMovies";
import {
  CheckboxLanguage,
  RowLanguage,
  ToggleButtonLanguage,
  ButtonCoverLanguage,
  TranslateLanguage,
  KnobsLanguage,
  SpanLanguage,
  LayerLanguage,
} from "./UI/style";
const ChangeLanguage = ({ changeLanguage }) => {
  const { checkedLanguage } = useMovies();
  return (
    <RowLanguage>
      <ToggleButtonLanguage>
        <ButtonCoverLanguage>
          <TranslateLanguage
            className="translate"
            id="translate-id"
            onClick={changeLanguage}
          >
            <CheckboxLanguage
              type="checkbox"
              checked={checkedLanguage}
              onChange={changeLanguage}
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

export default ChangeLanguage;
