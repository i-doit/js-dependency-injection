import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import esbuild from 'rollup-plugin-esbuild';
import pkg from './package.json'

const env = process.env.NODE_ENV;

const config = {
    input: 'src/index.js',
    external: Object.keys(pkg.peerDependencies || {}),
    output: {
        format: 'umd',
        name: 'JsDependencyInjection',
    },
    plugins: [
        nodeResolve(),
        babel({
            exclude: '**/node_modules/**',
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(env),
        }),
        commonjs(),
    ],
};

if (env === 'production') {
    config.plugins.push(
        esbuild({
            minify: true,
        })
    );
}

export default config;
