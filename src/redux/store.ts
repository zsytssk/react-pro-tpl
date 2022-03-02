import { compose, createStore } from 'redux';

import type { AppState } from './modules/app';
import rootReducer from './reducers';

export type RootState = {
    app: AppState;
};

export default function configureStore() {
    const storeEnhancers =
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(rootReducer, storeEnhancers());
}
