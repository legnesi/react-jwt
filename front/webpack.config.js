//const WebpackShellPlugin = require('webpack-shell-plugin');
const path = require('path');
var webpack = require('webpack');
module.exports = {
    //The entry file for the bundle
    entry: path.join(__dirname, '/client/src/app.jsx'),

    // the bundle file we will get in the result
    output: {
        path: path.join(__dirname, 'client/dist/js'),
        filename: 'app.js',
    },

    module: {

        // apply loaders to files that meet given conditions
        loaders: [{
            test: /\.jsx?$/,
            include: path.join(__dirname, '/client/src'),
            loader: 'babel-loader',
            query: {
                presets: ["react", "es2015"]
            }
        }],
    },

    plugins: [
        //Ici Webpack charge la variable d'env BACK_HOST et la rend disponible dans toute l'application
        new webpack.EnvironmentPlugin(['BACK_HOST'])
        //Permet de lancer des scripts shell avant et après le build webpack
        /**new WebpackShellPlugin({
            onBuildStart:['echo "*** Build Webpack ***"'], 
            onBuildEnd:['echo "*** Fin du build webpack ***"']
        })*/
    ],

    // start Webpack in a watch mode, so Webpack will rebuild the bundle on changes. In dev mode set true
    watch: false
};