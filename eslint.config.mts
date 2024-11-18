import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
	pluginJs.configs.all,
	...tseslint.configs.recommendedTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	...tseslint.configs.strictTypeChecked,
	{
		ignores: [
			`**/*.js`,
			`*.js`,
			`**/*.mjs`,
			`*.mjs`,
			`node_modules`
		],
	},
	{
		files: [
			`**/*.ts`,
			`*.mts`,
			`*.ts`
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
			"@typescript-eslint/no-shadow": [`error`],
			"complexity": [`off`],
			"curly": [ `error`, `multi-or-nest` ],
			"id-length": [`error`, {
				"exceptions": [`a`, `b`, `i`, `j`, `n`, `x`, `y`, `z`]
			}],
			"max-classes-per-file": [`off`],
			"max-lines": [`off`],
			"max-lines-per-function": [`off`],
			"max-params": [`off`],
			"max-statements": [`off`],
			"no-bitwise": [`off`],
			"no-console": [`warn`, {
				"allow": [ `warn`, `error` ]
			}],
			"no-inline-comments": [`off`],
			"no-magic-numbers": [`off`],
			"no-shadow": [`off`],
			"no-ternary": [`off`],
			"quotes": [ `error`, `backtick` ],
			"sort-imports": [`error`, {
				memberSyntaxSortOrder: [ `multiple`, `single`, `all`, `none` ]
			}]
		}
	}
);