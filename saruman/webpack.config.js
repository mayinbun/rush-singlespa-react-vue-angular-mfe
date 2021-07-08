const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    const isDev = argv.mode === 'development';
    return {
        output: {
            filename: 'index.bundle.js',
            uniqueName: 'saruman',
            publicPath: "http://localhost:5002/",
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                                presets: ['@babel/react', '@babel/env'],
                            },
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(jpg|jpeg|png|ico)$/,
                    use: {
                        loader: 'file-loader'
                    }
                }
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                favicon: './src/favicon.ico',
                filename: './index.html',
            }),
            new ModuleFederationPlugin({
                name: "saruman",
                filename: "remoteEntry.js",
                exposes: {
                    './app': './src/app.js',
                },
                shared: {
                    react: {
                        singleton: true,
                        eager: isDev
                    },
                    'react-dom': {
                        singleton: true,
                        eager: isDev
                    },
                    'react-helmet': {
                        singleton: true,
                        eager: isDev
                    }
                },
            }),
        ],
        devServer: {
            port: 5002,
            watchContentBase: true,
        },
    }
}