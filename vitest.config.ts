/// <reference types="vitest" />
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [vue()],
	test: {
		css: false,
		environment: "happy-dom",
		globals: true,
		setupFiles: ["./tests/vitest.setup.ts"],
	},
});
