import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isGitHubPages = mode === 'github';

  return {
    plugins: [react()],
    base: isGitHubPages ? '/bitcoin/' : '/', // Use '/bitcoin/' for GitHub Pages, '/' for Vercel
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  };
});
