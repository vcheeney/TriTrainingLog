import 'dotenv/config';

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
	return {
		apiUrl: process.env['VITE_API_BASE_PATH']
	};
}
