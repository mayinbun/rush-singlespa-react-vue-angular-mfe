const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { createRemoteMetaFromPackage } = require('@mayinbun/build-tools');
const { merge } = require('webpack-merge');
const pkg = require('./package.json');

module.exports = (config, options) => {
  const meta = createRemoteMetaFromPackage();

  const mergedConfig = merge(config, {
      output: {
        publicPath: meta.remoteLocalUrl,
        uniqueName: 'aragorn',
      },
      optimization: {
        runtimeChunk: false,
        splitChunks: { chunks: 'all' },
        chunkIds: 'named',
      },
      devServer: {
        historyApiFallback: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      },
      plugins: [
        new ModuleFederationPlugin({
          name: meta.remoteName,
          filename: meta.remoteEntryFileName,
          exposes: {
            './App': './src/main.single-spa.ts',
          },
          shared: {
            '@angular/core': { singleton: true, strictVersion: true, requiredVersion: pkg.dependencies['@angular/core'] },
            '@angular/common': { singleton: true, strictVersion: true, requiredVersion: pkg.dependencies['@angular/common'] },
            '@angular/common/http': { singleton: true, strictVersion: true, requiredVersion: pkg.dependencies['@angular/common'] },
            '@angular/router': { singleton: true, strictVersion: true, requiredVersion: pkg.dependencies['@angular/router'] },
            'rxjs': { singleton: true, strictVersion: true, requiredVersion: pkg.dependencies.rxjs },
            'single-spa-angular': { singleton: true, strictVersion: true, requiredVersion: pkg.dependencies['single-spa-angular'] },
          },
        }),
      ],
    },
  );

  console.log(mergedConfig);

  return mergedConfig;
};
