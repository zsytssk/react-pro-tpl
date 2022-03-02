import { TypeLanguageName } from '@app/constants/i18n';

let lang: TypeLanguageName = 'en';
export function setLang(_lang: TypeLanguageName) {
    lang = _lang;
}

export function getLang() {
    return lang;
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
    } else {
        // 如果没有匹配到支持的语言，统一按照英文展示
        result = 'en';
    }
    return [result, _lang !== result] as [TypeLanguageName, boolean];
}
