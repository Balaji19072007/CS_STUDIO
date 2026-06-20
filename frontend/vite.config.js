import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { sentryVitePlugin } from '@sentry/vite-plugin'

export default defineConfig({
  plugins: [
    react(),
    ...(process.env.VITE_SENTRY_AUTH_TOKEN
      ? [sentryVitePlugin({
          authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
          org: process.env.VITE_SENTRY_ORG,
          project: process.env.VITE_SENTRY_PROJECT,
          telemetry: false,
        })]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 3000,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-framer-motion';
            }
            if (id.includes('@monaco-editor')) {
              return 'vendor-monaco-editor';
            }
            if (id.includes('lucide-react') || id.includes('react-icons') || id.includes('feather-icons')) {
              return 'vendor-icons';
            }
            return 'vendor';
          }
        }
      }
    }
  },
})