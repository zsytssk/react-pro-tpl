import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { setLang } from '@app/constants/i18n';
import { useTranslateTpl, useLang } from '@app/constants/i18nTools';
import { appState } from '@app/state';

import { TestForm } from './modal/test_form';

export default function Home() {
    const [state, stateId] = appState.useState();
    const [visible, setVisible] = useState(false);
    const t = useTranslateTpl();
    const lang = useLang();

    useEffect(() => {
        console.log(`test:>`, state, stateId);
    }, [state, stateId]);

    return (
        <div>
            <button
                onClick={() => {
                    setLang(lang === 'en' ? 'zh-Hant' : 'en');
                    state.updateLang(lang === 'en' ? 'zh-Hant' : 'en');
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
