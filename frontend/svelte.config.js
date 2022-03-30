import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path';
import 'dotenv/config';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					src: path.resolve('./src')
				}
			},
			server: {
				port: process.env['FRONTEND_PORT'] || 5000
			},
			preview: {
				port: process.env['FRONTEND_PORT'] || 5000
			}
		},
		endpointExtensions: ['.js', '.ts'],
		files: {
			hooks: 'src/hooks.ts'
		}
	}
};

export default config;
