import {copyFileSync} from 'node:fs';
import path from 'path';
import {fileURLToPath} from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig, loadEnv} from 'vite';
import type {Plugin} from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Project Pages URL — must match repo name slug: https://<user>.github.io/pines-makes-website/ */
const GITHUB_PAGES_PROJECT_BASE = '/pines-makes-website/';

/** GitHub Pages serves 404.html for unknown paths, so SPA deep links load the app. */
function githubPagesSpaFallback(outDir: string): Plugin {
  return {
    name: 'github-pages-spa-fallback',
    apply: 'build',
    closeBundle() {
      const index = path.resolve(__dirname, outDir, 'index.html');
      copyFileSync(index, path.resolve(__dirname, outDir, '404.html'));
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const base = mode === 'production' ? GITHUB_PAGES_PROJECT_BASE : '/';

  return {
    base,
    plugins: [react(), tailwindcss(), githubPagesSpaFallback('docs')],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      outDir: 'docs',
      emptyOutDir: true,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
