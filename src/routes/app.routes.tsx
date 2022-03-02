import React from 'react';
import { RouteConfig } from 'react-router-config';
import { Redirect } from 'react-router-dom';

import { getLang } from '@app/utils/i18nUtils';

const { search, hash } = window.location;
export const routes: RouteConfig[] = [
    {
        path: '/',
        exact: true,
        render: function ComRedirect() {
            return <Redirect to={`${getLang()}${search}${hash}`} />;
        },
    },
    {
        path: ['/:lang', '/:lang/'],
        component: React.lazy(() => import('@app/pages/root')),
        routes: [
            {
                path: ['/:lang', '/:lang/'],
                exact: true,
                component: React.lazy(() => import('@app/pages/home')),
            },
            {
                path: '/:lang/loading',
                component: React.lazy(() => import('@app/pages/loading')),
                exact: true,
            },
        ],
    },
];
