const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');
const { createRemoteMetaFromPackage } = require('@mayinbun/build-tools');

const meta = createRemoteMetaFromPackage();

console.log(meta);

module.exports = (env, argv) => {
    const isDev = argv.mode === 'development';
    const sharedDeps = Object.keys(pkg.dependencies).map((key) => {
        return {
            [key]: {
                eager: isDev,
                singleton: true,
                strictVersion: true,
            },
        }
    })

    return {
        output: {
            filename: 'index.bundle.js',
            uniqueName: meta.remoteName,
            publicPath: 'http://localhost:5002/',
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
                filename: './index.html',
            }),
            new ModuleFederationPlugin({
                name: meta.remoteName,
                filename: meta.remoteEntryFileName,
                exposes: {
                    './App': './src/single-spa-entry.js',
                    './custom-element': './src/custom-element.js',
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
