import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { useEffect, useState } from 'react';
import { initReactI18next, useTranslation } from 'react-i18next';

import { CHANGE_LANG, getLang, LanguageNames } from './i18n';

const i18n = i18next.createInstance();

i18n
    // load translation using xhr -> see /public/locales
    .use(HttpApi)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        // fallbackLng: 'en',
        lng: getLang(),
        supportedLngs: LanguageNames,
        ns: [] /* 'common' */,
        defaultNS: 'common',
        debug: false,
        load: 'currentOnly',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        initImmediate: false,
        backend: {
            loadPath: `/locales/{{lng}}/{{ns}}.json`,
            queryStringParams: { v: GIT_VERSION },
            // loadPath: `${__webpack_public_path__}/locales/{{lng}}/{{ns}}.json`,
        },
        detection: {
            htmlTag: document.documentElement,
            lookupSessionStorage: 'i18nextLng',
            lookupCookie: 'lang',
            caches: ['cookie'],
            cookieMinutes: 60 * 24 * 365,
            cookieOptions: { path: '/', sameSite: false },
        },
    });

window.addEventListener(CHANGE_LANG, ({ detail }: any) => {
    i18n.changeLanguage(detail);
});

if (__isDev__) {
    (window as any).i18n = i18n;
}

export const useLang = () => {
    const [lang, setLang] = useState(getLang());
    useEffect(() => {
        const onLang: EventListener = ({ detail }: any) => {
            setLang(detail);
        };
        window.addEventListener(CHANGE_LANG, onLang);
        return () => window.removeEventListener(CHANGE_LANG, onLang);
    }, []);

    return lang;
};

export function useTranslateTpl() {
    const { t } = useTranslation(['index'], { i18n });
    return t;
}
export function getTranslateTpl(tpl: string) {
    return i18n.t(tpl);
}

export default i18n;
