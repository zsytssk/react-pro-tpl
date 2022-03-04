import * as path from 'path';
import { Configuration } from 'webpack';

import { paths } from './paths';

export const entryFn = (mode: Configuration['mode']) => {
    if (mode === 'development') {
        return [
            'webpack/hot/dev-server.js',
            'webpack-dev-server/client/index.js?hot=true&live-reload=true',
            paths.appIndexJs,
        ];
    }

    return paths.appIndexJs;
};
