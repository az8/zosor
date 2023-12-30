
    const { merge } = require('webpack-merge');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
  const commonConfig = require('./webpack.common');
  const packageJson = require('../package.json');
  const path = require('path');
  const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
  
  const devConfig = {
    mode: 'development',
    output: {
      publicPath: 'http://localhost:4001/',
    },
    devtool: 'inline-source-map',
    devServer: {
      hot: false,
      port: 4001,
      historyApiFallback: true,
      client: {
        overlay: {
          errors: false,
          warnings: false,
        },
      },
    },
  
    plugins: [
      new ModuleFederationPlugin({
        name: 'zosor',
        filename: 'remoteEntry.js',
      
        exposes: {
          './zosor': './src/bootstrap',
        },
        shared: packageJson.dependencies,
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new ReactRefreshWebpackPlugin(),
      
    ],
  
  
  };
  
  module.exports = merge(commonConfig, devConfig);
    