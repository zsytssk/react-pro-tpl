export const LanguageNameMap = {
    'zh-Hans': '简体中文',
    'zh-Hant': '繁体中文',
    en: '英语',
    ko: '韩语',
    ja: '日语',
    vi: '越南语',
    pt: '葡萄牙语',
};

export type TypeLanguageName = keyof typeof LanguageNameMap;
export const LanguageNames = Object.keys(LanguageNameMap) as TypeLanguageName[];
export const CHANGE_LANG = 'CHANGE_LANG';

export function setLang(lang: TypeLanguageName) {
    window.dispatchEvent(new CustomEvent(CHANGE_LANG, { detail: lang }));
    localStorage.setItem('lang', lang);
}

export function getLang() {
    const lang = localStorage.getItem('lang');
    return lang || 'en';
}

export function formatLang(_lang = '') {
    let result: TypeLanguageName;
    if (
        _lang === 'zh-Hans' ||
        _lang === 'zh' ||
        (_lang.includes('zh') && _lang.includes('cn'))
    ) {
        // 简体中文
        result = 'zh-Hans';
    } else if (_lang.indexOf('zh') >= 0) {
        // 繁体中文
        result = 'zh-Hant';
    } else if (_lang === 'ko' || _lang === 'ko-kr') {
        // 韩文
        result = 'ko';
    } else if (_lang === 'jp' || _lang === 'ja') {
        // 日语
        result = 'ja';
    } else if (_lang === 'vi' || _lang === 'vi-vn') {
        // 越南语
        result = 'vi';
    } else if (_lang === 'en') {
        // 如果没有匹配到支持的语言，统一按照英文展示
        result = 'en';
    }
    return result;
}
