import React from "react";
import { IntlProvider } from "react-intl";

import locale_AR from "@locale/ar.json";
import locale_FR from "@locale/fr.json";

import { useLocalStorage } from "@hooks";
import { isServer } from "styletron";

export enum Locale {
  AR = "ar",
  EN = "en",
  FR = "fr",
}

interface StructuredMessage {
  context?: string;
  string: string;
}
type LocaleMessages = Record<string, StructuredMessage>;
const localeData: Record<Locale, LocaleMessages> = {
  [Locale.AR]: locale_AR,
  // Default language
  [Locale.EN]: undefined,
  [Locale.FR]: locale_FR,
};

export const localeNames: Record<Locale, string> = {
  [Locale.AR]: "العربيّة",
  [Locale.EN]: "English",
  [Locale.FR]: "français",
};

const dotSeparator = "_dot_";
const sepRegExp = new RegExp(dotSeparator, "g");

function getKeyValueJson(messages: LocaleMessages): Record<string, string> {
  if (messages) {
    const keyValueMessages: Record<string, string> = {};
    return Object.entries(messages).reduce((acc, [id, msg]) => {
      acc[id.replace(sepRegExp, ".")] = msg.string;
      return acc;
    }, keyValueMessages);
  }
}

export function getMatchingLocale(languages: readonly string[]): Locale {
  const localeEntries = Object.entries(Locale);

  for (const preferredLocale of languages) {
    for (const localeEntry of localeEntries) {
      if (localeEntry[1].toLowerCase() === preferredLocale.toLowerCase()) {
        return Locale[localeEntry[0]];
      }
    }
  }

  return undefined;
}

const defaultLocale = Locale.EN;

export interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}
export const LocaleContext = React.createContext<LocaleContextType>({
  locale: defaultLocale,
  setLocale: () => undefined,
});

const { Consumer: LocaleConsumer, Provider: RawLocaleProvider } = LocaleContext;

const LocaleProvider: React.FC = ({ children }) => {
  const [locale, setLocale] = useLocalStorage(
    "locale",
    (!isServer && getMatchingLocale(navigator.languages)) || defaultLocale
  );
  return (
    <IntlProvider
      defaultLocale={defaultLocale}
      locale={locale}
      messages={getKeyValueJson(localeData[locale])}
      onError={(err) => {
        if (!err.message.includes("[React Intl] Missing message: ")) {
          console.error(err);
        }
      }}
      key={locale}
    >
      <RawLocaleProvider
        value={{
          locale,
          setLocale,
        }}
      >
        {children}
      </RawLocaleProvider>
    </IntlProvider>
  );
};

export { LocaleConsumer, LocaleProvider, RawLocaleProvider };
