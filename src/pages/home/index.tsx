import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { setLang } from '@app/constants/i18n';
import { useTranslateTpl, useLang } from '@app/constants/i18nTools';
import { actions } from '@app/redux/modules/app';

import { TestForm } from './modal/test_form';

export default function Home() {
    const [visible, setVisible] = useState(false);
    const t = useTranslateTpl();
    const lang = useLang();
    return (
        <div>
            <button
                onClick={() => {
                    setLang(lang === 'en' ? 'zh-Hant' : 'en');
                }}
            >
                le change lang to 11 {lang === 'en' ? 'zh-Hant' : 'en'}
            </button>
            <br />
            <Link to={`/loading`}>loading</Link>
            {t('records_bet_point')}
            <div onClick={() => setVisible(true)}>test form</div>
            <TestForm visible={visible} onClose={() => setVisible(false)} />
        </div>
    );
}
