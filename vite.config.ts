import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // Relative asset paths so the build works on GitHub Pages, Netlify, Vercel or any sub-folder.
  base: './',
  plugins: [react(), tailwindcss()],
});
