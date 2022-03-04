import { handleActions, Action } from 'redux-actions';

import { TypeLanguageName } from '@app/constants/i18n';

enum ActionTypes {
    SET_LANG = 'SET_LANG',
}

const initialState = {
    lang: null as TypeLanguageName,
};

export type AppState = typeof initialState;

const reducer: {
    [key: string]: (state: AppState, action: any) => any;
} = {};

reducer[ActionTypes.SET_LANG] = (
    state: AppState,
    action: Action<{ matchId: number; count: number }>,
) => {
    return { ...state, lang: action.lang };
};

export const actions = {
    setLang: (lang: string) => {
        return { type: ActionTypes.SET_LANG, lang };
    },
};

export default handleActions(reducer, initialState);
