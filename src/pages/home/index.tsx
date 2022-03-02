import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { actions } from '@app/redux/modules/app';

import { useLang, useLangMap } from '../shared/i18n';
import { TestForm } from './modal/test_form';

export default function Home() {
    const [visible, setVisible] = useState(false);
    const lang = useLang();
    const dispatch = useDispatch();
    const langMap = useLangMap();

    return (
        <div>
            <button
                onClick={() => {
                    dispatch(actions.setLang('en'));
                }}
            >
                le change lang to en
            </button>
            {langMap('test.test') + '111111'}
            <br />
            <Link to={`/${lang}/loading`}>loading</Link>

            <div onClick={() => setVisible(true)}>test form</div>
            <TestForm visible={visible} onClose={() => setVisible(false)} />
        </div>
    );
}
