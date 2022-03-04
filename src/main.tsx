import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, useRoutes } from 'react-router-dom';

import configureStore from '@app/redux/store';
import { routes } from '@app/routes/app.routes';

import Loading from './pages/loading';
import Root from './pages/root';

ReactDOM.render(
    <Provider store={configureStore()}>
        <StrictMode>
            <Suspense fallback={<Loading />}>
                <BrowserRouter>
                    <Root />
                </BrowserRouter>
            </Suspense>
        </StrictMode>
    </Provider>,
    document.getElementById('root'),
);
