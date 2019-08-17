import { DEFAULT_EXTENSIONS } from '@babel/core';

import typescript from 'rollup-plugin-typescript2';
// import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const isProduction = process.env.NODE_ENV === 'production';

// rollup.config.js
export default (async () => ({
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: 'dist/index.mjs',
            format: 'esm',
            sourcemap: true,
        },
    ],
    plugins: [
        /*resolve({
            mainFields: ['module', 'main', 'browser'],
            extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx', '.js', '.mjs', '.jsx', '.ejs'],
            modulesOnly: false
        }),*/
        typescript(null),
        babel({
            sourceMaps: true,
            inputSourceMap: true,

            extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx', '.js', '.mjs', '.jsx', '.ejs'],
            // include: ['src/**/*'],
            presets: [
                "@babel/preset-react",
                // "@babel/preset-typescript",
                ["@babel/preset-env", {"modules": false}],
            ],
            plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-proposal-object-rest-spread",
            ],
        }),
        isProduction && (await import('rollup-plugin-terser')).terser()
    ],
    external: ['react', 'ol']
}))();