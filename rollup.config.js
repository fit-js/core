import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import localResolve from 'rollup-plugin-local-resolve';
import * as pkg from './package.json';

export default {
  input: pkg.module,
  output: {
    file: pkg.main,
    format: 'cjs'
  },
  name: 'fit',
  external: [
    'fs',
    'path',
    'process'
  ],
  plugins: [
    nodeResolve ({
      jsnext: true,
      module: true,
      main: true,
      preferBuiltins: true
    }),
    localResolve(),
    commonjs ({
      include: 'node_modules/**',
      ignoreGlobal: false,
      sourceMap: false
    })
  ]
};
