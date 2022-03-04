import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import configureStore from '@app/redux/store';

import Root from './pages/root';

ReactDOM.render(
    <Provider store={configureStore()}>
        <StrictMode>
            <BrowserRouter>
                <Root />
            </BrowserRouter>
        </StrictMode>
    </Provider>,
    document.getElementById('root'),
);
