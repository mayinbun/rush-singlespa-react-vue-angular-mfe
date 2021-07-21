const { createRemoteMetaFromPackage } = require('@mayinbun/build-tools');
const { remoteLocalUrl } = require('./package.json');
const meta = createRemoteMetaFromPackage();
const isDEV = process.env.NODE_ENV === 'development';

module.exports = {
    publicPath: remoteLocalUrl,
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        port: 5004,
        publicPath: remoteLocalUrl,
    },
    chainWebpack: (config) => {
        // config.optimization.delete('splitChunks');
        config.plugin('module-federation-plugin')
            .use(
                require('webpack').container.ModuleFederationPlugin,
                [{
                    name: meta.remoteName,
                    filename: meta.remoteEntryFileName,
                    exposes: {
                        './App': './src/main.single-spa.js',
                    },
                    shared: {
                        'vue': { singleton: true },
                        'single-spa-vue': { singleton: true },
                        'core-js': { singleton: true },
                    },
                }],
            )
    },
}
