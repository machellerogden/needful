const path = require('path');

module.exports = {
    entry: './index.src.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        globalObject: 'eval(0, "this")',
        library: 'needful',
        libraryTarget: 'umd',
        filename: 'needful.js'
    },
    module: {
        rules: [
            {
                test: /\index.src.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            'minify'
                        ]
                    }
                }
            }
        ]
    }
};
