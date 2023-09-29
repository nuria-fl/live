module.exports = {
	parser: "vue-eslint-parser",
	parserOptions: {
		parser: "@typescript-eslint/parser",
		sourceType: "module",
	},
	extends: ["eslint-config-codely/typescript", "plugin:vue/base"],
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			parserOptions: {
				parser: "@typescript-eslint/parser",
				project: ["./tsconfig.json"],
			},
		},
		{
			files: ["./*.config.ts"],
			parserOptions: {
				parser: "@typescript-eslint/parser",
				project: ["./tsconfig.node.json"],
			},
		},
		{
			files: ["./tests/**/*.ts"],
			plugins: ["vitest"],
		},
	],
	rules: {
		"prettier/prettier": ["error", { printWidth: 80, useTabs: true }],
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-unsafe-argument": "off",
		"@typescript-eslint/no-non-null-assertion": "warn",
	},
	settings: {
		"import/resolver": {
			node: {
				extensions: [".js", ".jsx", ".ts", ".tsx"],
			},
		},
	},
};
