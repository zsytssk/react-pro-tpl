import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {
    Configuration,
    DefinePlugin,
    HotModuleReplacementPlugin,
    EnvironmentPlugin,
} from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { git } from './other';
import { paths } from './paths';

export const pluginsFn = (mode: Configuration['mode']) => {
    const isEnvDevelopment = mode === 'development';
    const isEnvProduction = mode === 'production';
    const GIT_VERSION = git('describe --always');
    const GIT_AUTHOR_DATE = git('log -1 --format=%aI');
    let plugins = [
        new EnvironmentPlugin({
            GIT_VERSION: GIT_VERSION,
            GIT_AUTHOR_DATE: GIT_AUTHOR_DATE,
        }),
        new DefinePlugin({
            __isDev__: JSON.stringify(isEnvDevelopment),
            __isProd__: JSON.stringify(isEnvProduction),
        }),
        new HtmlWebpackPlugin({
            favicon: './public/favicon.ico',
            template: './public/index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.appPublic,
                    to: paths.appBuild,
                    globOptions: {
                        ignore: ['**/index.html'],
                    },
                },
            ],
        }),
        new CleanWebpackPlugin(),
    ];

    if (process.env.analyze) {
        plugins = [...plugins, new BundleAnalyzerPlugin()];
    }

    return plugins;
};
