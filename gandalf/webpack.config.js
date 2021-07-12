const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const pkg = require('./package.json');

module.exports = (env, argv) => {
    const isDev = argv.mode === 'development';
    const sharedDeps = Object.keys(pkg.dependencies).map((key) => {
        return {
            [key]: {
                eager: isDev,
                singleton: true,
                strictVersion: true
            }
        }
    })
    return {
        output: {
            filename: '[name].[contenthash].bundle.js',
            uniqueName: 'gandalf',
            publicPath: 'http://localhost:5001/',
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
                    test: /\.(jpg|png|ico)$/,
                    use: {
                        loader: 'file-loader',
                    },
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                favicon: './src/favicon.ico',
                filename: './index.html',
            }),
            new ModuleFederationPlugin({
                name: 'gandalf',
                filename: 'remoteEntry.js',
                exposes: {
                    './App': './src/single-spa-entry.js',
                    './custom-element': './src/custom-element.js',
                },
                shared: [
                    ...sharedDeps
                ]
            }),
        ],
        devServer: {
            port: 5001,
            watchContentBase: true,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        },
    }
}
