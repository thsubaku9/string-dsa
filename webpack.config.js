const path = require('path');

module.exports = {
    entry : {'string-dsa': './src/index.js'},
    output : {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js",
        library: 'stringdsa',
        libraryTarget: 'umd'
    },
    module : {
        rules: [{
            test : /\.js$/,
            exclude : /(node_modules)/,
            loader: "babel-loader"
        }]
    },
    devServer : {
        contentBase : path.resolve(__dirname, 'dist'),
        compress : true,
        port : 3000
    }
};
