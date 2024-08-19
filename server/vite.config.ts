import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	server: {
		port: 5000, // Server runs on localhost:3000
		open: true, // Automatically open the app in the browser
	},
	build: {
		outDir: 'dist', // Output directory for the build
		emptyOutDir: true, // Clear the output directory before building
		target: 'esnext', // Target modern JavaScript syntax
		minify: 'esbuild', // Minify the output using esbuild
		rollupOptions: {
			input: path.resolve(__dirname, 'main.ts'), // Entry point for the build
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'), // Alias for the src directory
		},
	},
	plugins: [
		// Add any necessary Vite plugins here
	],
});
