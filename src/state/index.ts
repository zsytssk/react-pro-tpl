import { EventState } from 'react-event-state';

export const AppEventState = {
    CHANGE_LANG: 'changeLang',
};

class AppState extends EventState {
    public lang = 'en';
    constructor() {
        super(Object.values(AppEventState));
    }
    public updateLang(lang: string) {
        this.lang = lang;
        this.emit(AppEventState.CHANGE_LANG);
    }
}

export const appState = new AppState();
