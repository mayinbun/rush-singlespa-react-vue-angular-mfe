const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { createRemoteMetaFromPackage } = require('@mayinbun/build-tools');
const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;
const { merge } = require('webpack-merge');

module.exports = (config, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);
  const meta = createRemoteMetaFromPackage();

  const mergedConfig = merge(singleSpaWebpackConfig, {
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: meta.remoteName,
        filename: meta.remoteEntryFileName,
        exposes: {
          './App': './src/main.single-spa.ts',
        },
        shared: [],
      }),
    ],
  });

  console.log(mergedConfig);

  return mergedConfig;
};
