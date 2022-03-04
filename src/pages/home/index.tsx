import React, { useEffect, useState } from 'react';
import { useThrottleEventSelector } from 'react-event-state/hooks';
import { Link } from 'react-router-dom';

import { setLang } from '@app/constants/i18n';
import { useLang, useTranslateTpl } from '@app/constants/i18nTools';
import { appState } from '@app/state';

import { TestForm } from './testForm';

export default function Home() {
    // const [state, stateId] = useThrottleEventState(appState, 500);
    const [stateLang, langStateId] = useThrottleEventSelector(
        appState,
        (appState) => appState.lang,
        500,
    );
    const [visible, setVisible] = useState(false);
    const t = useTranslateTpl();
    const lang = useLang();

    useEffect(() => {
        setLang(stateLang as any);
        console.log(`test:>1`, stateLang);
    }, [stateLang, langStateId]);

    return (
        <div>
            <button
                onClick={() => {
                    appState.updateLang(lang === 'en' ? 'zh-Hant' : 'en');
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
