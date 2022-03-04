import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import type { AppState } from './modules/app';
import rootReducer from './reducers';

export type RootState = {
    app: AppState;
};

export default function configureStore() {
    const middleWares = [];
    middleWares.push(thunkMiddleware);

    const middlewareEnhancer = applyMiddleware(...middleWares);

    const storeEnhancers =
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(rootReducer, storeEnhancers(middlewareEnhancer));
}
