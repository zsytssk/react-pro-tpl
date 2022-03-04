import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Root from './pages/root';

ReactDOM.render(
    <StrictMode>
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    </StrictMode>,
    document.getElementById('root'),
);
