import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import { useLocalStorage } from "../Components/hooks/useLocalStorage";
import MensajesIngles from "../lang/en-US.json";
import MensajesEspañol from "../lang/es-ES.json";

const langContext = React.createContext();

const LangProvider = ({ children }) => {
  const [language, setLanguage] = useLocalStorage("language", "");
  const [messages, setMessages] = useLocalStorage("messages", "");
  const [checkedLanguage, setCheckedLanguage] = useLocalStorage(
    "checkedLanguage",
    ""
  );
  const [watchTrailerOverview, setWatchTrailerOverview] = useState(
    language === "en-US" ? "Watch trailer" : "Ver trailer"
  );
 const changeLanguage = () => {
    if (language === "en-US") {
      setLanguage("es-ES");
      setMessages(MensajesEspañol);
      setCheckedLanguage(true);
      setWatchTrailerOverview("Ver trailer");
    } else {
      setLanguage("en-US");
      setMessages(MensajesIngles);
      setCheckedLanguage(false);
      setWatchTrailerOverview("Watch trailer");
    }
  };

  const changeLanguageOverviewTrailer = (playing, language) => {
    if (playing === false) {
      language === "en-US"
        ? setWatchTrailerOverview("Hide trailer")
        : setWatchTrailerOverview("Ocultar trailer");
    } else {
      language === "es-ES"
        ? setWatchTrailerOverview("Ver trailer")
        : setWatchTrailerOverview("Watch trailer");
    }
  };
  return (
    <langContext.Provider
      value={{
        changeLanguage: changeLanguage,
        changeLanguageOverviewTrailer: changeLanguageOverviewTrailer,
        language: language,
        checkedLanguage: checkedLanguage,
        watchTrailerOverview: watchTrailerOverview,
      }}
    >
      <IntlProvider
        locale={language}
        messages={messages}
      >
        {children}
      </IntlProvider>
    </langContext.Provider>
  );
};

export { langContext, LangProvider };
