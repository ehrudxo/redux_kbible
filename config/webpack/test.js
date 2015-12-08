import webpack from 'webpack';

module.exports = {
    devtool: 'eval',
    entry: {
        spec: `./test/spec.js`
    },
    plugins:[

    ],
    quiet: true,
    watch: true
};
