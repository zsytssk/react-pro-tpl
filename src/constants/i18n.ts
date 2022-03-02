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
