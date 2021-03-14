import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import { terser } from "rollup-plugin-terser"

import sizes from 'rollup-plugin-sizes';
import visualizer from 'rollup-plugin-visualizer'
import pkg from './package.json';

const plugs = [
	terser(), // mini
	sizes(),
	visualizer({
		filename: "docs/stats.html",
		title: "PragmaJS Visualised",
		sourcemap: false
	})
]

export default [
	// browser-friendly UMD build
	{
		input: 'src/index.js',
		output: [{
			name: 'pragma',
			file: pkg.browser,
			format: 'umd'
		}, {
			name: 'pragma',
			file: 'docs/scripts/pragma.umd.js',
			format: 'umd'
		}],
		plugins: [
			resolve(), // so Rollup can find `ms`
			commonjs(), // so Rollup can convert `ms` to an ES module
	
		].concat(plugs)
	},

	{
		input: 'src/index.js',
		external: ['ms'],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es', sourcemap: true }
		],
		plugins: [
			// terser()
		].concat(plugs)
	}
]
