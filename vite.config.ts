import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      // Development server config
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      // Production preview config (Important for Render Web Service)
      preview: {
        port: 3000,
        host: '0.0.0.0',
        allowedHosts: true, // This fixes the "Blocked request" error
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});