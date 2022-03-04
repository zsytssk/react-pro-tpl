import { Configuration } from 'webpack';

import { devServerConfigFn } from './devserver';
import { entryFn, outputFn } from './entryOutput';
import { fileLoader, tsLoaderFn, lessLoaderFn } from './loader';
import { genDevtool, genOptimise, resolve } from './other';
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
        optimization: genOptimise(mode),
        resolve,
        devServer: devServerConfigFn(mode),
        plugins: pluginsFn(mode),
    };
}
