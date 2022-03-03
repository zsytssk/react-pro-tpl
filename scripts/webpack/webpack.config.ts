import { Configuration } from 'webpack';

import { devServerConfigFn } from './devserver';
import { fileLoader, tsLoaderFn, lessLoaderFn } from './loader';
import { genDevtool, resolve } from './other';
import { paths } from './paths';
import { pluginsFn } from './plugin';

export default function (_, argv: Configuration) {
    const mode = argv.mode;
    return {
        entry: paths.appIndexJs,
        output: {
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
        },
        mode,
        devtool: genDevtool(mode),
        target: mode === 'production' ? ['web', 'es5'] : ['web'],
        module: {
            rules: [
                { ...tsLoaderFn(mode) },
                { ...lessLoaderFn(mode) },
                // { ...cssLoaderFn(mode) },
                { ...fileLoader },
            ],
        },
        resolve,
        devServer: devServerConfigFn(mode),
        plugins: pluginsFn(mode),
    };
}
