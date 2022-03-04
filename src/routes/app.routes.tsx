import React from 'react';

import Home from '@app/pages/home';
import Loading from '@app/pages/loading';
import Root from '@app/pages/root';

const { search, hash } = window.location;
export const routes = [
    {
        path: '*',
        element: <Home />,
    },
    {
        path: '/loading',
        element: <Loading />,
    },
];
