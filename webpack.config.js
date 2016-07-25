var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: "./app/App.js",
	output: {
		filename: "public/bundle.js"
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.js$/, 
				loader: 'jsx-loader'
			},
           {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            }
		]
	},
	plugins: [
        new ExtractTextPlugin('public/style.css', {
            allChunks: true
        })
    ]


};