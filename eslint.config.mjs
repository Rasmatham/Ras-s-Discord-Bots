import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	...tseslint.configs.strictTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	{
		ignores: [
			"**/*.js",
			"*.js",
			"**/*.mjs",
			"*.mjs",
			"node_modules"
		],
	},
	{
		files: [
			"**/*.ts",
			"*.ts"
		],
	},
	{
		languageOptions: {
			globals: {...globals.browser, ...globals.node},
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			}
		},
	},
	{
		rules: {
			quotes: ["error", "backtick"]
		}
	}
];