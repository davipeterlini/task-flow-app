import React, { createContext, useContext, useState } from "react";

type Language = "pt-BR" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  "pt-BR": {
    home: "Inicio",
    kanban: "Kanban",
    list: "Lista",
    calendar: "Calendario",
    today: "Hoje",
    settings: "Configuracoes",
    logout: "Sair",
  },
  en: {
    home: "Home",
    kanban: "Kanban",
    list: "List",
    calendar: "Calendar",
    today: "Today",
    settings: "Settings",
    logout: "Logout",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("pt-BR");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
