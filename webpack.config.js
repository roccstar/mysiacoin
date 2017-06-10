const path = require('path');

module.exports = {
    entry: path.resolve('.') + '/src/client/components/index.jsx',
    output: {
        path: path.resolve('.') + '/public/js',
        filename: 'app.js'
    },
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        //hot: true,
        inline: true,
        compress: true,
        contentBase: './public',
        filename: 'app.js',
        host: 'localhost',
        port: 8080,
        proxy: {
            '^/api/v1/generator': {
                target: 'http://localhost:3000/api/v1/generator',
                secure: false
            },
            '^/index': {
                target: 'http://localhost:3000/index',
                secure: false
            },
            '/': {
                target: 'http://localhost:3000/',
                secure: false
            }
        },
        stats: { colors: true }
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                query: {
                    presets: [ 'babel-preset-es2015', 'babel-preset-react' ],
                    plugins: ['transform-react-jsx']
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
            }
        ]
    }
};
