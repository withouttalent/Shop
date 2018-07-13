var path = require('path')
var webpack = require('webpack')


module.exports = {
    devServer: {
      historyApiFallback: true,
      inline: true,
      contentBase: 'assets/bundles',
      publicPath: "/",
      port: 3000,
    },
    devtool: "cheap-module-eval-source-map",
    entry: ['webpack-dev-server/client?http://127.0.0.1:3000',
        './assets/js/index'],
    
    output: {
        path: __dirname + '/assets/bundles',
        filename: 'bundle.js',
    },
    
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    
    module: {
        rules: [
            {
                test:/\.css$/,
                use:['style-loader', 'css-loader']
            },
            {test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader', 
                query: {
                    presets: ['react'] 
                }
            }
        ]
    },
    
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx'] 
    }   
}
