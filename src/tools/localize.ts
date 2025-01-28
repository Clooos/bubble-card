import * as en from "../translations/en.json";
import * as fr from "../translations/fr.json";

const languages = {
  en,
  fr,
};

const DEFAULT_LANG = "en";

function getCurrentLocale(context) {
  return context._hass?.locale.language ?? DEFAULT_LANG;
}

function dotStringReducer(currentObject, key) {
  return currentObject[key];
}

function getTranslatedString(key, lang) {
  try {
    const translationList = languages[lang];
    return key.split(".").reduce(dotStringReducer, translationList);
  } catch {
    return undefined;
  }
}

export default function setupTranslation(context) {
  return function (key) {
    const lang = getCurrentLocale(context);
    const translation = getTranslatedString(key, lang);

    if (translation) return translation;

    const defaultTranslation = getTranslatedString(key, DEFAULT_LANG);
    if (defaultTranslation) return defaultTranslation;

    return key;
  };
}