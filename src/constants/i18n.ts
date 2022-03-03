import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { initReactI18next, useTranslation } from 'react-i18next';

import { getUrlParam } from '@app/libs/bitUI/utils';

export type Languages = 'en' | 'vi' | 'ja' | 'ko' | 'zh-Hant' | 'tr';

export const Langs = ['en', 'vi', 'ja', 'ko', 'zh-Hant', 'tr'];

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
        // lookupQuerystring: 'lang',
        lng:
            getUrlParam('language') ||
            /* (window.paladin && paladin.sys.config.lang) || */ 'zh-Hant',
        supportedLngs: Langs,
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

window.addEventListener('BTG_LANG_CHANGED', ({ detail }: any) =>
    i18n.changeLanguage(detail),
);

if (__isDev__) {
    (window as any).i18n = i18n;
}

export function useTranslateTpl() {
    const { t } = useTranslation(['index'], { i18n });
    return t;
}
export function getTranslateTpl(tpl: string) {
    return i18n.t(tpl);
}

export default i18n;
