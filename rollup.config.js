import { babel } from '@rollup/plugin-babel'
import pkg from './package.json'

const external = Object.keys(pkg.dependencies).concat('path')

export default {
  input: 'src/index.js',
  plugins: [babel({ babelHelpers: 'bundled' })],
  external,
  output: [
    { file: pkg.main, format: 'cjs', exports: 'auto' },
    { file: pkg.module, format: 'es' }
  ]
}
