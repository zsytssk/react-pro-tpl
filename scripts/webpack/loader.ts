import { Configuration } from 'webpack';

export const fileLoader = {
    test: /\.(png|jpg|svg|gif)$/,
    exclude: /node_modules/,
    use: ['file-loader'],
};

export const lessLoaderFn = (mode: Configuration['mode']) => {
    return {
        test: /(\.css|\.less)$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    sourceMap: mode === 'development',
                    modules: true,
                },
            },
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        /* eslint-disable-next-line */
                        plugins: [require('autoprefixer')()],
                    },
                },
            },
            {
                loader: 'less-loader',
                options: {
                    sourceMap: mode === 'development',
                },
            },
        ],
    };
};
export const cssLoaderFn = (mode: Configuration['mode']) => {
    return {
        test: /(\.css)$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    sourceMap: mode === 'development',
                    modules: false,
                },
            },
        ],
    };
};

export const tsLoaderFn = (mode: Configuration['mode']) => {
    const default_config = {
        test: /(\.ts|\.tsx|\.jsx|\.js)$/,
        exclude:
            /node_modules(\/|\\)(?!(react-hook-form|react-router|react-router-dom|react-event-state)(\/|\\)).*/,
        use: [
            {
                loader: 'thread-loader',
            },
            {
                loader: 'ts-loader',
                options: {
                    happyPackMode: true,
                },
            },
        ],
    };

    if (mode === 'production') {
        default_config.use.splice(1, 0, {
            loader: 'babel-loader',
        });
    }

    return default_config;
};
