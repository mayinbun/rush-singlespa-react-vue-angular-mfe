const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const ExternalRemotesPlugin = require('external-remotes-plugin');
const path = require('path')
const outputPath = path.resolve(__dirname, 'dist')
const { gandalfApp } = require('./remotes');

module.exports = (webpackConfigEnv, argv) => {
    return {
        entry: {
            main: './src/index',
            version_detector: './src/version-detector',
        },
        mode: 'development',
        devtool: 'source-map',
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
        },
        resolve: {
            extensions: ['.jsx', '.js', '.json', '.ts', '.tsx'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
            ],
        },
        plugins: [
            new ModuleFederationPlugin({
                name: 'single-spa',
                remotes: {
                    'gandalf': gandalfApp.federationConfig,
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
