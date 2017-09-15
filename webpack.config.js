let webpack = require("webpack");

module.exports = {
    entry: __dirname + "/src/public/main.js",
    output: {
	path: __dirname + "/src/public/",
	filename: "main.min.js"
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
	})
    ]
}
