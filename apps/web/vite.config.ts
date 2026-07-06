import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // React 19 — fast refresh + automatic JSX runtime
    react(),

    // Tailwind CSS v4 — CSS-first, processes @theme and @utility directives
    // Replaces postcss/autoprefixer approach from Tailwind v3
    tailwindcss(),
  ],

  resolve: {
    alias: {
      // Absolute import alias — @/* maps to src/*
      // All workspace package aliases are resolved via pnpm symlinks automatically
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Load environment variables from monorepo root (.env, .env.local, .env.{mode})
  envDir: path.resolve(__dirname, '../../'),

  // Prefix for env vars exposed to client code
  // Usage: import.meta.env.VITE_API_URL
  envPrefix: 'VITE_',

  server: {
    port: 3000,
    strictPort: false,
    // Proxy configuration placeholder — API calls will route to apps/api
    // Uncomment and configure in Prompt 002 when providers are wired
    // proxy: {
    //   '/api': {
    //     target: `http://localhost:${process.env.PORT ?? 3001}`,
    //     changeOrigin: true,
    //   },
    // },
  },

  build: {
    outDir: 'dist',
    // Sourcemaps off for production — enable per-deploy if needed
    sourcemap: false,
    // Empty dist before each build
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Vendor chunk split for better long-term caching
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router'],
          'vendor-motion': ['framer-motion'],
        },
      },
    },
  },
});
