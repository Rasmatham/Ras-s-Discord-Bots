// #region imports
import pluginJs from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import perfectionist from "eslint-plugin-perfectionist";
import globals from "globals";
import tseslint from "typescript-eslint";
// #endregion

enum NamingConventionFormat {
	/* eslint-disable @typescript-eslint/naming-convention */
	camelCase = `camelCase`,
	PascalCase = `PascalCase`,
	snake_case = `snake_case`,
	strictCamelCase = `strictCamelCase`,
	StrictPascalCase = `StrictPascalCase`,
	UPPER_CASE = `UPPER_CASE`
	/* eslint-enable @typescript-eslint/naming-convention */
}
interface NamingConventionRule { format: NamingConventionFormat[], selector: string | string[] }
const easyNamingConvention = (selectors: string[], format: NamingConventionFormat[] = [NamingConventionFormat.strictCamelCase]): NamingConventionRule[] => selectors.map((selector) => ({ format, selector }));

// eslint-disable-next-line one-var
const namingConventions = [
	...easyNamingConvention([ `classicAccessor`, `autoAccessor`, `classMethod`, `classProperty`, `function`, `import`, `objectLiteralMethod`, `objectLiteralProperty`, `parameter`, `parameterProperty`, `typeMethod`, `typeProperty`, `variable` ]),
	...easyNamingConvention([ `class`, `enum`, `enumMember`, `interface`, `typeAlias`, `typeParameter` ], [NamingConventionFormat.StrictPascalCase])
];

export default tseslint.config(
	pluginJs.configs.all,
	stylistic.configs.customize({
		arrowParens: true,
		commaDangle: `never`,
		flat: true,
		indent: `tab`,
		quotes: `backtick`,
		semi: true
	}),
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
		]
	},
	{
		files: [
			`**/*.ts`,
			`*.mts`,
			`*.ts`
		]
	},
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			}
		},
		plugins: {
			perfectionist
		}
	},
	/* eslint-disable @typescript-eslint/naming-convention */
	{
		// Disabled rules
		rules: {
			"@typescript-eslint/adjacent-overload-signatures": `off`,
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
			"no-ternary": `off`,
			"no-use-before-define": `off`,
			"prefer-destructuring": `off`,
			"sort-imports": `off`,
			"sort-keys": `off`,
			"sort-vars": `off`
		}
	},
	{
		// @typescript-eslint rules
		rules: {
			"@typescript-eslint/array-type": [ `error`, {
				default: `array-simple`
			}],
			"@typescript-eslint/class-methods-use-this": [`error`],
			"@typescript-eslint/consistent-type-exports": [`error`],
			"@typescript-eslint/consistent-type-imports": [`error`],
			"@typescript-eslint/default-param-last": [`error`],
			"@typescript-eslint/explicit-function-return-type": [`error`],
			"@typescript-eslint/explicit-member-accessibility": [`error`],
			"@typescript-eslint/explicit-module-boundary-types": [`error`],
			"@typescript-eslint/init-declarations": [ `error`, `never`, { ignoreForLoopInit: true }],
			"@typescript-eslint/method-signature-style": [`error`],
			"@typescript-eslint/naming-convention": [ `error`, ...namingConventions ],
			"@typescript-eslint/no-floating-promises": [ `error`, {
				checkThenables: true
			}],
			"@typescript-eslint/no-import-type-side-effects": [`error`],
			"@typescript-eslint/no-loop-func": [`error`],
			"@typescript-eslint/no-magic-numbers": [ `error`, {
				ignoreEnums: true
			}],
			"@typescript-eslint/no-meaningless-void-operator": [ `error`, { checkNever: true }],
			"@typescript-eslint/no-shadow": [`error`],
			"@typescript-eslint/no-this-alias": [`error`],
			"@typescript-eslint/no-unnecessary-parameter-property-assignment": [`error`],
			"@typescript-eslint/no-unnecessary-qualifier": [`error`],
			"@typescript-eslint/no-unsafe-type-assertion": [`error`],
			"@typescript-eslint/no-use-before-define": [`error`],
			"@typescript-eslint/no-useless-empty-export": [`error`],
			"@typescript-eslint/prefer-destructuring": [`error`],
			"@typescript-eslint/prefer-enum-initializers": [`error`],
			"@typescript-eslint/prefer-find": [`error`],
			"@typescript-eslint/prefer-readonly": [`error`],
			"@typescript-eslint/promise-function-async": [`error`],
			"@typescript-eslint/require-array-sort-compare": [`error`],
			"@typescript-eslint/strict-boolean-expressions": [`error`],
			"@typescript-eslint/switch-exhaustiveness-check": [`error`]
		}
	},
	{
		// Perfectionist rules
		rules: {
			"perfectionist/sort-array-includes": [`error`],
			"perfectionist/sort-imports": [`error`],
			"perfectionist/sort-interfaces": [`error`],
			"perfectionist/sort-intersection-types": [`error`],
			"perfectionist/sort-maps": [`error`],
			"perfectionist/sort-modules": [`error`],
			"perfectionist/sort-named-exports": [`error`],
			"perfectionist/sort-named-imports": [`error`],
			"perfectionist/sort-object-types": [`error`],
			"perfectionist/sort-objects": [`error`],
			"perfectionist/sort-sets": [`error`],
			"perfectionist/sort-switch-case": [`error`],
			"perfectionist/sort-union-types": [`error`],
			"perfectionist/sort-variable-declarations": [`error`]
		}
	},
	{
		rules: {
			"@stylistic/array-bracket-spacing": [ `error`, `always`, {
				arraysInArrays: false,
				objectsInArrays: false,
				singleValue: false
			}],
			"@stylistic/member-delimiter-style": [ `error`, {
				multiline: {
					delimiter: `comma`,
					requireLast: false
				},
				singleline: {
					delimiter: `comma`
				}
			}],
			"@stylistic/operator-linebreak": [ `error`, `after` ]
		}
	},
	{
		// Eslint rules
		rules: {
			"array-bracket-spacing": [ `error`, `always`, {
				arraysInArrays: false,
				objectsInArrays: false,
				singleValue: false
			}],
			"computed-property-spacing": [ `error`, `never` ],
			"curly": [ `error`, `multi-or-nest` ],
			"id-length": [ `error`, {
				exceptions: [ `a`, `b`, `i`, `j`, `n`, `x`, `y`, `z` ]
			}],
			"no-console": [ `warn`, {
				allow: [ `error`, `info`, `warn` ]
			}],
			"object-curly-spacing": [ `error`, `always`, {
				arraysInObjects: true,
				objectsInObjects: true
			}],
			"quotes": [ `error`, `backtick` ],
			"semi": [ `error`, `always`, {}]
		}
	}
	/* eslint-enable @typescript-eslint/naming-convention */
);
