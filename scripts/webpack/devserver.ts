import * as path from 'path';
import { Configuration } from 'webpack';

export const devServerConfigFn = (mode: Configuration['mode']) => {
    return {
        historyApiFallback: true,
        host: '0.0.0.0',
        contentBase: path.join(__dirname, 'build'),
        disableHostCheck: true,
        port: 3000,
        open: true,
        hot: true,
        openPage: 'http://localhost:3000',
    };
};
