const webpack = require('webpack');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack: (config, options) => {
      if (options.isServer) {
        const antStyles = /antd\/.*?\/style.*?/;
        const origExternals = [...config.externals];
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback();
            if (typeof origExternals[0] === 'function') {
              origExternals[0](context, request, callback);
            } else {
              callback();
            }
          },
          ...(typeof origExternals[0] === 'function' ? [] : origExternals),
        ];

        config.module.rules.unshift({
          test: antStyles,
        });
      }

      config.plugins.push(
        new FilterWarningsPlugin({
          exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
        })
      );

      // 过滤moment语言包
      config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

      // Fix 'fs' module not found on `yarn build`
      // https://github.com/evanw/node-source-map-support/issues/155#issuecomment-368345232
      // eslint-disable-next-line
      config.node = {
        fs: 'empty',
        module: 'empty',
      };

      return config;
    },
  })
}
