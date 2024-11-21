import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

const namingConventions = [
	{
		"format": [`strictCamelCase`],
		"selector": `classicAccessor`
	},
	{
		"format": [`strictCamelCase`],
		"selector": `autoAccessor`
	},
	{
		"format": [`StrictPascalCase`],
		"selector": `class`
	},
	{
		"format": [`strictCamelCase`],
		"selector": `classMethod`
	},
	{
		"format": [`strictCamelCase`],
		"selector": `classProperty`
	},
	{
		"format": [`StrictPascalCase`],
		"selector": `enum`
	},
	{
		"format": [`StrictPascalCase`],
		"selector": `enumMember`
	},
	{
		"format": [`strictCamelCase`],
		"selector": `function`
	},
	{
		"format": [`strictCamelCase`],
		"selector": `import`
	},
	{
		"format": [`StrictPascalCase`],
		"selector": `interface`
	},
	{
		"format": [`strictCamelCase`],
		"selector": `objectLiteralMethod`
	},
	{
		"format": [`strictCamelCase`],
		"selector": `objectLiteralProperty`
	},
	{
		"format": [`strictCamelCase`],
		"selector": `parameter`
	},
	{
		"format": [`strictCamelCase`],
		"selector": `parameterProperty`
	},
	{
		"format": [`StrictPascalCase`],
		"selector": `typeAlias`
	},
	{
		"format": [`strictCamelCase`],
		"selector": `typeMethod`
	},
	{
		"format": [`UPPER_CASE`],
		"selector": `typeParameter`
	},
	{
		"format": [`strictCamelCase`],
		"selector": `typeProperty`
	},
	{
		"format": [`strictCamelCase`],
		"selector": `variable`
	}
];

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
	/* eslint-disable @typescript-eslint/naming-convention */
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
			"no-loop-func": `off`,
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
			"@typescript-eslint/method-signature-style": [`error`],
			"@typescript-eslint/naming-convention": [ `error`, ...namingConventions ],
			"@typescript-eslint/no-floating-promises": [ `error`, {
				"checkThenables": true
			}],
			"@typescript-eslint/no-import-type-side-effects": [`error`],
			"@typescript-eslint/no-loop-func": [`error`],
			"@typescript-eslint/no-magic-numbers": [ `error`, {
				"ignoreEnums": true
			}],
			"@typescript-eslint/no-meaningless-void-operator": [ `error`, { "checkNever": true }],
			"@typescript-eslint/no-shadow": [`error`],
			"@typescript-eslint/no-this-alias": [`error`],
			"@typescript-eslint/no-unnecessary-parameter-property-assignment": [`error`]
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
	/* eslint-enable @typescript-eslint/naming-convention */
);