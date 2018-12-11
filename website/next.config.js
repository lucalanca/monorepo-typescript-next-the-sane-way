const withPlugins = require('next-compose-plugins');
const withTypescript = require('@zeit/next-typescript');
const withTM = require('next-plugin-transpile-modules');
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

module.exports = withPlugins([
  [withTypescript],
  [withTM],
  [withBundleAnalyzer]
], {
  transpileModules: ['shared'],
  webpack(config, options) {
    if (options.isServer && options.dev) {
      const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

      config.plugins.push(
        new ForkTsCheckerWebpackPlugin({
          tsconfig: '../tsconfig.json',
          tslint: '../tslint.json',
        }),
      );
    }

    return config;
  },
  analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  }
})