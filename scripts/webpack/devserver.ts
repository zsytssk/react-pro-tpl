import * as path from 'path';
import { Configuration } from 'webpack';

export const devServerConfigFn = (mode: Configuration['mode']) => {
    return {
        allowedHosts: 'all',
        host: '0.0.0.0',
        static: {
            directory: path.join(__dirname, 'build'),
        },
        port: 3000,
        https: false,
        hot: false,
        open: 'http://localhost:3000',
    };
};
