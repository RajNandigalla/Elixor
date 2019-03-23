const typescript = require('rollup-plugin-typescript2')
const { uglify } = require('rollup-plugin-uglify')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
import pkg from './package.json'

const makeConfig = ({
    packageName,
    declaration = false,
    umd = false,
    compress = false,
    file
}) => {
    const plugins = [
        nodeResolve({ jsnext: true, module: true }),
        commonjs({
            include: `${packageName}/node_modules/**`
        }),
        typescript({
            tsconfig: `${packageName}/tsconfig.json`,
            useTsconfigDeclarationDir: true,
            clean: true,
            tsconfigOverride: { compilerOptions: { declaration } }
        }),
        compress && uglify()
    ].filter(Boolean)

    return {
        input: `src/packages/index.ts`,
        external:
            umd ? [] : Object.keys(
                pkg.dependencies || {}
            ).concat(
                Object.keys(
                    pkg.peerDependencies || {}
                )
            ),
        output: umd ? {
            file,
            name: packageName,
            format: 'umd'
        } : [
                {
                    format: 'es',
                    file: `dist/elixor.es.js`
                },
                {
                    format: 'cjs',
                    file: `dist/elixor.cjs.js`
                }
            ],
        plugins
    }
}
const makePackageConfig = packageName =>
    makeConfig({
        packageName,
        declaration: true
    })

module.exports = [
    makeConfig({
        packageName: 'elixor',
        file: 'dist/elixor.min.js',
        umd: true,
        compress: true
    }),
    makeConfig({
        packageName: 'elixor',
        file: 'dist/elixor.js',
        umd: true,
        format: 'umd'
    }),
    makePackageConfig('elixor')
].filter(Boolean)
