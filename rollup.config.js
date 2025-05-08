import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

const sharedPlugins = [resolve(), commonjs(), terser()];

export default [
	{
		input: "dist/index.js",
		output: {
			file: "bundle/locksmith-ui.bundle.js",
			format: "esm",
			sourcemap: true,
		},
		plugins: sharedPlugins,
	},
	{
		input: "dist/administration.js",
		output: {
			file: "bundle/locksmith-admin.bundle.js",
			format: "esm",
			sourcemap: true,
		},
		plugins: sharedPlugins,
	},
];
