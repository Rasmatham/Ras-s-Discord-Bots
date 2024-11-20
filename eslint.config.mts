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
			globals: { ...globals.browser, ...globals.node },
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			}
		},
	},
	{
		// Disabled rules
		rules: {
			"class-methods-use-this": `off`,
			"complexity": `off`,
			"default-param-last": `off`,
			"init-declarations": `off`,
			"max-classes-per-file": `off`,
			"max-lines": `off`,
			"max-lines-per-function": `off`,
			"max-params": `off`,
			"max-statements": `off`,
			"no-bitwise": `off`,
			"no-duplicate-imports": `off`,
			"no-inline-comments": `off`,
			"no-magic-numbers": `off`,
			"no-shadow": `off`,
			"no-ternary": `off`
		}
	},
	{
		// @typescript-eslint rules
		rules: {
			"@typescript-eslint/array-type": [ `error`, {
				"default": `array-simple`
			}],
			"@typescript-eslint/class-methods-use-this": [`error`],
			"@typescript-eslint/consistent-type-exports": [`error`],
			"@typescript-eslint/consistent-type-imports": [`error`],
			"@typescript-eslint/default-param-last": [`error`],
			"@typescript-eslint/explicit-function-return-type": [`error`],
			"@typescript-eslint/explicit-member-accessibility": [`error`],
			"@typescript-eslint/explicit-module-boundary-types": [`error`],
			"@typescript-eslint/init-declarations": [ `error`, `never`, { "ignoreForLoopInit": true }],
			"@typescript-eslint/no-shadow": [`error`]
		}
	},
	{
		// Eslint rules
		rules: {
			"array-bracket-spacing": [ `error`, `always`, {
				"arraysInArrays": false,
				"objectsInArrays": false,
				"singleValue": false
			}],
			"computed-property-spacing": [ `error`, `never` ],
			"curly": [ `error`, `multi-or-nest` ],
			"id-length": [ `error`, {
				"exceptions": [ `a`, `b`, `i`, `j`, `n`, `x`, `y`, `z` ]
			}],
			"no-console": [ `warn`, {
				"allow": [ `error`, `info`, `warn` ]
			}],
			"object-curly-spacing": [ `error`, `always`, {
				"arraysInObjects": true,
				"objectsInObjects": true
			}],
			"quotes": [ `error`, `backtick` ],
			"semi": [ `error`, `always`, {}],
			"sort-imports": [ `error`, {
				memberSyntaxSortOrder: [ `multiple`, `single`, `all`, `none` ]
			}]
		}
	}
);