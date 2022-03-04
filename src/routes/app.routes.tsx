import React from 'react';

import Home from '@app/pages/home';
import Loading from '@app/pages/loading';

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
