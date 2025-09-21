import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from 'path'

export default defineConfig({
	plugins: [
		react()
	],
	resolve: {
		alias: {
			'@assets': resolve(__dirname, 'public/Assets')
		}
	},
	assetsInclude: ['**/*.JPG', '**/*.jpg', '**/*.jpeg', '**/*.JPEG', '**/*.png', '**/*.gif', '**/*.svg'],
	server: {
		historyApiFallback: true
	},
	build: {
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
		},
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['react', 'react-dom'],
					router: ['react-router-dom'],
					analytics: ['@emailjs/browser']
				}
			}
		},
		chunkSizeWarningLimit: 1000
	}
})