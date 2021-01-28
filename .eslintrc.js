module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	"env": {
		"browser": true,
		"node": true,
		"es6": true,
	},
	"parserOptions": {
		"sourceType": "module",
		"ecmaVersion": 2018,
		"ecmaFeatures": {
			"impliedStrict": true,
			"jsx": true,
		},
	},
	"plugins": [
		"react",
		"@typescript-eslint",
	],
	"extends": [
		"react-app",
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
	],
	"settings": {
		"react": {
			"version": "detect",
		},
	},
	"rules": {
		"valid-jsdoc": "warn",

		"block-scoped-var": "error",
		"curly": "error",
		"default-case": "error",
		"dot-location": ["error", "property"],
		"eqeqeq": "error",
		"no-console": "error",
		"no-debugger": "warn",
		"no-else-return": "warn",
		"no-eval": "warn",
		"no-multi-spaces": "warn",
		"no-unused-expressions": "warn",
		"@typescript-eslint/no-unused-vars": "error",
		// "no-warning-comments": "warn",
		"no-with": "error",
		"require-await": "error",
		"strict": "warn",

		"no-shadow": "warn",
		// "no-undef": "error",
		"no-undefined": "error",
		"no-sync": "warn",
		"no-var": "error",

		"array-bracket-spacing": "error",
		"block-spacing": "error",
		"brace-style": ["error", "1tbs", {"allowSingleLine": true}],
		"comma-spacing": "error",
		"comma-style": "error",
		"comma-dangle": ["error", "always-multiline"],
		"camelcase": "warn",
		"computed-property-spacing": "error",
		"eol-last": "warn",
		"func-call-spacing": "error",
		"indent": ["error", "tab", {"SwitchCase": 1}],
		"key-spacing": "error",
		"keyword-spacing": "error",
		"line-comment-position": "warn",
		"linebreak-style": "error",
		"lines-around-comment": "error",
		"lines-between-class-members": "error",
		"new-parens": "error",
		"no-array-constructor": "error",
		"no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
		"no-trailing-spaces": "error",
		"no-whitespace-before-property": "error",
		"object-curly-newline": ["error", {"consistent": true, "multiline": true}],
		"quotes": ["warn", "double", { "avoidEscape": true }],
		"semi": "error",
		"space-before-blocks": "error",
		"space-before-function-paren": ["error", {"anonymous": "always", "named": "never", "asyncArrow": "always"}],
		"space-in-parens": "error",
		"space-infix-ops": "error",
		"space-unary-ops": "error",
		"spaced-comment": "warn",
		"switch-colon-spacing": "error",

		"arrow-spacing": "error",
		"prefer-const": "warn",
		"prefer-rest-params": "warn",
		"prefer-spread": "warn",
		"prefer-template": "error",
		"rest-spread-spacing": "error",
		"template-curly-spacing": "error",

		"no-prototype-builtins": "off",
		"require-atomic-updates": "off",

		"react/prop-types": "off",
		"react/react-in-jsx-scope": "off",
	},
};
