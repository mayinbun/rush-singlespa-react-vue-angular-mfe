const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const ExternalRemotesPlugin = require('external-remotes-plugin');
const path = require('path')
const outputPath = path.resolve(__dirname, 'dist')

module.exports = async (webpackConfigEnv, argv) => {
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
        externals: ['zone.js'],
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
                    saruman: 'saruman@[window.__remote__saruman__]',
                    aragorn: 'aragorn@[window.__remote__aragorn__]',
                    legolas: 'legolas@[window.__remote__legolas__]',
                },
                exposes: {},
                shared: {
                    'rxjs': { eager: true, singleton: true },
                },
            }),
            new ExternalRemotesPlugin(),
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                inject: 'body',
            }),
        ],
    }
};
