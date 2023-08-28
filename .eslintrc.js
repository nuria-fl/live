module.exports = {
	parser: "vue-eslint-parser",
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
			files: ["vite.config.ts"],
			parserOptions: {
				parser: "@typescript-eslint/parser",
				project: ["./tsconfig.node.json"],
			},
		},
	],
	rules: {
		"prettier/prettier": ["error", { printWidth: 80, useTabs: true }],
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-unsafe-argument": "off",
	},
};
