import React from 'react';
import { RouteConfig } from 'react-router-config';
import { Redirect } from 'react-router-dom';

import { getLang } from '@app/constants/i18n';

const { search, hash } = window.location;
export const routes: RouteConfig[] = [
    {
        path: ['/:lang', '/:lang/', '/'],
        component: React.lazy(() => import('@app/pages/root')),
        routes: [
            {
                path: ['/'],
                exact: true,
                component: React.lazy(() => import('@app/pages/home')),
            },
            {
                path: '/loading',
                component: React.lazy(() => import('@app/pages/loading')),
                exact: true,
            },
        ],
    },
];
