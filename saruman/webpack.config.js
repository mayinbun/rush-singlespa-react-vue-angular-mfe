const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');
const { createRemoteMetaFromPackage } = require('@mayinbun/build-tools');

const meta = createRemoteMetaFromPackage();

module.exports = (env, argv) => {
    const isDEV = argv.mode === 'development';
    const sharedDeps = Object.keys(pkg.dependencies).map((key) => {
        return {
            [key]: {
                singleton: true,
                strictVersion: true,
            },
        }
    })

    return {
        output: {
            filename: '[name].[contenthash].bundle.js',
            uniqueName: meta.remoteName,
            publicPath: isDEV ? meta.remoteLocalUrl : meta.remoteCdnUrl,
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
                        loader: 'file-loader',
                    },
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                favicon: './src/favicon.ico',
            }),
            new ModuleFederationPlugin({
                name: meta.remoteName,
                filename: meta.remoteEntryFileName,
                exposes: {
                    './App': './src/main.single-spa.js',
                },
                shared: [
                    ...sharedDeps,
                ],
            }),
        ],
        devServer: {
            port: 5002,
            watchContentBase: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        },
    }
}
