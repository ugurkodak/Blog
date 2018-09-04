module.exports = {
    entry: __dirname + '/src/views/main.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + "/src/static"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
};