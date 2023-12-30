const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  // ...other configurations

  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(webp|jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images/",
            },
          },
        ],
      },
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              "@babel/preset-env",
              "@babel/preset-typescript",
              "@babel/preset-react",
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
              "react-hot-loader/babel",
              ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
            ],
          },
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // Injects styles into DOM
          "css-loader", // Translates CSS into CommonJS
          "postcss-loader", // Applies PostCSS transformations
          "sass-loader", // Compiles Sass to CSS
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },

  plugins: [
    // ...other plugins

    new ForkTsCheckerWebpackPlugin(),
  ],
};
