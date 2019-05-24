module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path: require('path').resolve(__dirname, 'rplugin'),
    filename: 'ask-vscode.js',
    library: 'askVscode',
    libraryTarget:'umd'
  }
}
