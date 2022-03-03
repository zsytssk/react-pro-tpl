import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration, DefinePlugin, EnvironmentPlugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { git } from './other';

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    favicon: './public/favicon.ico',
    template: './public/index.html',
});

export const pluginsFn = (mode: Configuration['mode']) => {
    const isEnvDevelopment = mode === 'development';
    const isEnvProduction = mode === 'production';
    const GIT_VERSION = git('describe --always');
    const GIT_AUTHOR_DATE = git('log -1 --format=%aI');
    let plugins = [
        htmlWebpackPlugin,
        new CleanWebpackPlugin(),
        new EnvironmentPlugin({
            GIT_VERSION: GIT_VERSION,
            GIT_AUTHOR_DATE: GIT_AUTHOR_DATE,
        }),
        new DefinePlugin({
            APP__GITHASH: GIT_VERSION,
            __isDev__: JSON.stringify(isEnvDevelopment),
            __isProd__: JSON.stringify(isEnvProduction),
        }),
    ];

    if (process.env.analyze) {
        plugins = [...plugins, new BundleAnalyzerPlugin()];
    }

    return plugins;
};
