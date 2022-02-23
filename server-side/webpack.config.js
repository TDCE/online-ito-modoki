const path = require('path');
// const __dirname = path.resolve(path.dirname(''));
const assetsDir = path.resolve(__dirname, 'public/assets');

module.exports = {
  mode: 'development',
  entry: {
    app: assetsDir + '/src/app.tsx',
  },
  output: {
    path: assetsDir + '/dist',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
