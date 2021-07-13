const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const ExternalRemotesPlugin = require('external-remotes-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const path = require('path')
const outputPath = path.resolve(__dirname, 'dist')
const fetch = require('node-fetch');

module.exports = async (webpackConfigEnv, argv) => {
   /* const meta = await fetch('http://localhost:9999/versions').then(res => res.json());

    const remotesFromMeta = meta.reduce((remotes, item) => {
        return {
            ...remotes,
            [item.remoteName]: `${item.remoteName}@[window.${item.remoteWindowProperty}]`
        }
    }, {});

    console.log(remotesFromMeta);*/

    return {
        entry: {
            main: './src/index',
            version_detector: './src/version-detector',
        },
        mode: 'development',
        devtool: 'source-map',
        target: 'web',
        optimization: {
            splitChunks: { chunks: 'all' },
        },
        output: {
            filename: '[name].[contenthash].js',
            publicPath: 'http://localhost:9000/',
        },
        devServer: {
            historyApiFallback: true,
            contentBase: outputPath,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        },
        resolve: {
            extensions: ['.jsx', '.js', '.json', '.ts', '.tsx'],
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'ts-loader',
                    },
                },
            ],
        },
        plugins: [
            new ModuleFederationPlugin({
                name: 'single-spa',
                remotes: {
                    gandalf: 'gandalf@[window.__remote__gandalf__]',
                    'saruman': 'saruman@[window.sarumanAppUrl]/remoteEntry.js',
                },
                exposes: {},
                shared: [],
            }),
            new ExternalRemotesPlugin(),
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                inject: 'body',
            }),
        ],
    }
};
