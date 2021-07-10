const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const path = require('path')
const outputPath = path.resolve(__dirname, 'dist')

module.exports = (webpackConfigEnv, argv) => {
    return {
        entry: './src/index',
        mode: 'development',
        devtool: 'source-map',
        optimization: {
            minimize: false,
        },
        output: {
            publicPath: 'http://localhost:9000/',
        },
        devServer: {
            historyApiFallback: true,
            contentBase: outputPath
        },
        resolve: {
            extensions: ['.jsx', '.js', '.json', '.ts', '.tsx'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: require.resolve('babel-loader'),
                    options: {
                        presets: [require.resolve('@babel/preset-typescript')],
                    },
                },
            ],
        },
        plugins: [
            new ModuleFederationPlugin({
                name: 'single-spa',
                filename: 'remoteEntry.js',
                remotes: {
                    'gandalf': 'gandalf@http://localhost:5001/remoteEntry.js',
                },
                exposes: {},
                shared: [],
            }),
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                inject: 'body'
            }),
        ],
    }
};
