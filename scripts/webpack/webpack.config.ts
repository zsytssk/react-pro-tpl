import { Configuration } from 'webpack';

import { devServerConfigFn } from './devserver';
import { entryFn } from './entry';
import { fileLoader, tsLoaderFn, lessLoaderFn } from './loader';
import { genDevtool, resolve } from './other';
import { outputFn } from './output';
import { paths } from './paths';
import { pluginsFn } from './plugin';

export default function (_, argv: Configuration) {
    const mode = argv.mode;
    return {
        entry: entryFn(mode),
        output: outputFn(mode),
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
