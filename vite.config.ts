import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'ProParket',
        short_name: 'ProParket',
        description: 'Upravljanje poslovima za parketare',
        theme_color: '#3b5bdb',
        background_color: '#111827',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/ProParketLogo.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/ProParketLogo.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/ProParketLogo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '#': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
