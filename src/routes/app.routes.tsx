import React, { Suspense } from 'react';

import Loading from '@app/pages/loading';

const Home = React.lazy(() => import('@app/pages/home'));

export const routes = [
    {
        path: '*',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <Home />
            </Suspense>
        ),
    },
    {
        path: '/loading',
        element: <Loading />,
    },
];
