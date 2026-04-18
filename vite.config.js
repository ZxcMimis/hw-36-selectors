import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  base: '/hw-36-selectors/', 
  resolve: {
    alias: {
      components: '/src/components',
      services: '/src/services',
      views: '/src/views',
    },
  },
});