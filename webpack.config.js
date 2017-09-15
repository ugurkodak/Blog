let webpack = require("webpack");

module.exports = {
    entry: {
	blog: __dirname + "/src/public/blog/blog.js",
	index: __dirname + "/src/public/home/index.js"
    },
    output: {
	path: __dirname + "/src/public/",
	filename: "[name].bundle.js"
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
	}),
	new webpack.optimize.UglifyJsPlugin({
	    compress: {
		warnings: false
	    }
	})
    ]
}
