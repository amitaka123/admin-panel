import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	ssr: {
		noExternal: ['three'],
	  },
	plugins: [sveltekit()],
	server: {
		expose:true,
		port: 16000,
		strictPort: false,
	},

	preview: {
		port: 16000,
		strictPort: false,
	}
});
