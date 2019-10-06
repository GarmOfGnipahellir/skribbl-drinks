import metablock from 'rollup-plugin-userscript-metablock'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/skribbl-drinks.user.js',
        format: 'iife',
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        resolve(),
        commonjs(),
        metablock(),
    ],
}
