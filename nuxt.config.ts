// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	vite: {
		optimizeDeps: {
			exclude: ["vee-validate"],
		},
	},
	experimental: {
		typedPages: true,
	},
	compatibilityDate: "2024-09-25",
	devtools: { enabled: true },
	modules: [
		"nuxt-auth-utils",
		"@nuxtjs/tailwindcss",
		"shadcn-nuxt",
		"@vee-validate/nuxt",
		"@vueuse/nuxt",
		"@formkit/auto-animate/nuxt",
		"magic-regexp/nuxt",
		"@pinia/nuxt",
	],
	ssr: false,
	shadcn: {
		/**
		 * Prefix for all the imported component
		 */
		prefix: "",
		/**
		 * Directory that the component lives in.
		 * @default "./components/ui"
		 */
		componentDir: "./components/ui",
	},
	nitro: {
		esbuild: {
			options: {
				target: "esnext",
			},
		},
	},
	css: ["~/assets/scss/main.scss"],
	veeValidate: {
		componentNames: {
			Form: "VeeForm",
		},
	},
});
