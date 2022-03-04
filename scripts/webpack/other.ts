import * as child_process from 'child_process';
import TerserPlugin from 'terser-webpack-plugin';
import { Configuration } from 'webpack';

import { paths } from './paths';

export function git(command: string) {
    return child_process
        .execSync(`git ${command}`, { encoding: 'utf8' })
        .trim();
}

export const resolve = {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
        '@app': paths.appSrc,
    },
};

export function genDevtool(mode: Configuration['mode']) {
    if (mode === 'development') {
        return 'eval-source-map';
    }
    return false;
}
export function genOptimise(mode: Configuration['mode']) {
    return {
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
        ],
        splitChunks: {
            cacheGroups: {
                libs: {
                    test: /[\\/](node_modules)[\\/]/,
                    chunks: 'initial',
                    name: 'libs',
                    priority: 10,
                    enforce: true,
                },
            },
        },
    };
}
