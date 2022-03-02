import React, { createContext, useCallback } from 'react';
import { useSelector } from 'react-redux';

import i18n from '@app/i18n';
import { RootState } from '@app/redux/store';
import template from '@app/utils/template';

export const LocaleMap = {
    'zh-Hans': { value: 'zh_CN', oldStandard: 'zh-CN' },
    'zh-Hant': { value: 'zh_TW', oldStandard: 'zh-TW' },
    en: { value: 'en_GB', oldStandard: 'en' },
    ja: { value: 'ja_JP', oldStandard: 'ja' },
    ko: { value: 'ko_KR', oldStandard: 'ko' },
    pt: { value: 'pt_PT', oldStandard: 'pt' },
    vi: { value: 'vi_VN', oldStandard: 'vi' },
    ar: { value: 'ar_EG', oldStandard: 'ar' },
};

export const LanguageContext = createContext<any>({});

export const LanguageProvider = (props: any) => {
    const lang = useSelector((state: RootState) => state.app.lang);
    document.getElementsByTagName('html')[0].setAttribute('lang', lang + '');
    return (
        <LanguageContext.Provider value={i18n[lang]}>
            {props.children}
        </LanguageContext.Provider>
    );
};

export const useLang = () =>
    useSelector(
        (state) => (state as RootState).app.lang,
        (before, after) => before === after,
    );

export function useLangMap() {
    const lang = useLang();
    return useCallback(
        (namespace, data?: any) => {
            const context = i18n[lang];
            if (!namespace) return null;
            const info = namespace
                .split('.')
                .reduce((s, n) => (s ? s[n] : undefined), context);
            if (!info) console.warn(`i18n ${namespace} undefined`);
            return info ? template(info, data) : '';
        },
        [lang],
    );
}
