const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const commonConfig = require("./webpack.common");
const Webpack = require("webpack");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const PACKAGE = require('../package.json');

const prodConfig = {
  mode: "production",
  devtool: "hidden-source-map",
  //chunkhash - used to generate unique id to each bundle. Very useful method if you are trying to
  //achieve long-term caching to optimize load times. These ids are only subject to change if the resource has changed, making
  //it possible for browsers to retrieve the file from cache storage, rather than make a new request.
  output: {
    filename: `[name].[chunkhash].${PACKAGE.version}.bundle.js`,
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new WebpackManifestPlugin(),
    new Webpack.ids.HashedModuleIdsPlugin({
      hashFunction: "sha256",
      hashDigest: "hex",
      hashDigestLength: 5
    }),
    new MiniCssExtractPlugin({
      filename: `css/style.[contenthash].${PACKAGE.version}.bundle.css`,
      chunkFilename: `css/style.[contenthash].${PACKAGE.version}.css`
    })
  ],
  optimization: {
    runtimeChunk: "single",
    moduleIds: 'deterministic',
    //separate vendor chunks
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    },
    minimize: true,
    //perform optimization - a very important step to perform in production! Create compressed, minified bundles
    //using terser-webpack-plugin and css-minimizer-webpack-plugin to reduce load time.
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
          },
          module: false,
          format: {
            beautify: false,
            comments: false
          }
        }
      }),
      new CssMinimizerPlugin()
    ]
  },
  performance: {
    hints: 'warning',
  }
};

module.exports = merge(commonConfig, prodConfig);