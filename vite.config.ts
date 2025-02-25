import { defineConfig } from 'vite'

import Vue from '@vitejs/plugin-vue'

// Unplugin icons
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

// Compressors
import { createHtmlPlugin } from 'vite-plugin-html'
import { compression as viteCompression } from 'vite-plugin-compression2'

// Other
import Sitemap from 'vite-plugin-sitemap'
import autoprefixer from 'autoprefixer'

import DOMAIN from './CNAME.ts'

const googleTagID = 'G-0TM7HRVX06'

/** Google Tag Manager script to be included in the HTML */
const googleTagScript = `
<script async src="https://www.googletagmanager.com/gtag/js?id=${googleTagID}"></script>
<script>
	window.dataLayer = window.dataLayer || [];
	function gtag() {
		dataLayer.push(arguments);
	}

	gtag("js", new Date());
	gtag("config", "${googleTagID}");
</script>
`

/**
 * Vite configuration file.
 *
 * This configuration file sets up Vite with various plugins and settings for development and production environments.
 */
export default defineConfig({
	plugins: [
		Vue(),
		Components({
			resolvers: [
				IconsResolver({
					customCollections: ['other'],
				}),
			],
		}),
		Icons({
			defaultClass: 'icon',
			autoInstall: true,
			customCollections: {
				other: FileSystemIconLoader('./src/assets/icons'),
			},
		}),
		createHtmlPlugin({
			minify: true,
			inject: {
				data: {
					gtagScript: process.env.NODE_ENV === 'production' ? googleTagScript : '',
					DOMAIN: DOMAIN,
				},
			},
		}),
		// @ts-expect-error
		viteCompression({ filter: /\.(js|css|html)$/i }),
		Sitemap({ hostname: `https://${DOMAIN}` }),
	],
	css: {
		postcss: { plugins: [autoprefixer()] },
	},

	define: {
		DOMAIN: JSON.stringify(DOMAIN),
	},
})
