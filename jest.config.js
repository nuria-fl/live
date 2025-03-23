module.exports = {
	testEnvironment: "jsdom",
	testEnvironmentOptions: {
		customExportConditions: ["node", "node-addons"],
	},
	setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
	moduleFileExtensions: ["js", "json", "vue", "ts"],
	transform: {
		".*\\.(vue)$": "@vue/vue3-jest",
		".*\\.(js)$": "babel-jest",
		".*\\.(ts)$": "ts-jest",
	},
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	testMatch: [
		"**/__tests__/**/*.spec.[jt]s?(x)",
		"**/?(*.)+(spec|test).[jt]s?(x)",
		"**/tests/**/*.spec.[jt]s?(x)",
	],
};
