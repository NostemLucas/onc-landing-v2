// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },

	runtimeConfig: {
		public: {
			NUXT_API_URL: process.env.NUXT_API_URL,
			NUXT_API_ENV: process.env.NUXT_API_ENV,
		},
	},
	css: ['~/assets/css/main.css'],
	vite: {},
	typescript: {
		strict: true,
	},

	modules: [
		'@nuxt/eslint',
		'nuxt-lucide-icons',
		'@nuxt/image',
		'@nuxtjs/color-mode',
		'@nuxt/ui',
		'@pinia/nuxt',
		'@compodium/nuxt',
		'@vee-validate/nuxt',
	],
	app: {
		baseURL: process.env.NUXT_APP_BASE_URL || '/',
		head: {
			title: 'Login App',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			],
		},
	},
});
