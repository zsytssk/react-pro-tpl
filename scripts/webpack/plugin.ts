import { Configuration, EnvironmentPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { git } from './other';

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    favicon: './public/favicon.ico',
    template: './public/index.html',
});

export const pluginsFn = (mode: Configuration['mode']) => {
    let plugins = [
        htmlWebpackPlugin,
        new CleanWebpackPlugin(),
        new EnvironmentPlugin({
            GIT_VERSION: git('describe --always'),
            GIT_AUTHOR_DATE: git('log -1 --format=%aI'),
        }),
    ];

    if (process.env.analyze) {
        plugins = [...plugins, new BundleAnalyzerPlugin()];
    }

    return plugins;
};
