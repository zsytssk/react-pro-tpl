import * as path from 'path';
import { Configuration } from 'webpack';

export const devServerConfigFn = (mode: Configuration['mode']) => {
    return {
        historyApiFallback: true,
        clientLogLevel: 'silent',
        host: '0.0.0.0',
        contentBase: path.join(__dirname, 'bin'),
        disableHostCheck: true,
        port: 9000,
        open: true,
        openPage: 'http://localhost:9000',
    };
};
