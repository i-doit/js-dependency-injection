const { NODE_ENV, BABEL_ENV } = process.env
const cjs = NODE_ENV === 'test' || BABEL_ENV === 'commonjs'
const loose = true

module.exports = {
    presets: [['@babel/preset-env', { loose, modules: false }]],
    plugins: [
        cjs && ['@babel/transform-modules-commonjs', { loose }],
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-syntax-export-default-from",
        ["@babel/plugin-transform-private-property-in-object", { "loose": false }],
        ["@babel/plugin-transform-private-methods", { "loose": false }]
    ].filter(Boolean)
};
