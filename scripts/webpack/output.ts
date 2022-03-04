import * as path from 'path';
import { Configuration } from 'webpack';

import { paths } from './paths';

export function outputFn(mode: Configuration['mode']) {
    return {
        path: paths.appBuild,
        filename: '[name].[fullhash].js',
        publicPath: '/',
        environment: {
            arrowFunction: false,
            bigIntLiteral: false,
            const: false,
            destructuring: false,
            dynamicImport: false,
            forOf: false,
            module: false,
        },
    };
}
