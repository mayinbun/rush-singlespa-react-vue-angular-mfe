const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { createRemoteMetaFromPackage } = require('@mayinbun/build-tools');
const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;
const { merge } = require('webpack-merge');

module.exports = (config, options) => {
  const meta = createRemoteMetaFromPackage();

  const mergedConfig = merge(config, {
      devServer: {
        historyApiFallback: true,
      },
      plugins: [
        new ModuleFederationPlugin({
          name: meta.remoteName,
          filename: meta.remoteEntryFileName,
          exposes: {
            './AragornApp': './src/main.single-spa.ts',
          },
          shared: [
            {
              '@angular/core': {
                singleton: true,
                strictVersion: true,
              },
              '@angular/common': {
                singleton: true,
                strictVersion: true,
              },
              '@angular/router': {
                singleton: true,
                strictVersion: true,
              },
            },
          ],
        }),
      ],
    },
    )
  ;

  console.log(mergedConfig);

  return mergedConfig;
};
