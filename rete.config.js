import sass from 'rollup-plugin-sass';

export default {
    input: 'src/index.js',
    name: 'ConnectionPluginPolyline',
    plugins: [
        sass({
            insert: true
        })
    ]
}