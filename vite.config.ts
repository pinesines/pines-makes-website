import {copyFileSync} from 'node:fs';
import path from 'path';
import {fileURLToPath} from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig, loadEnv} from 'vite';
import type {Plugin} from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Pages URL base: `'/'` for org/user site at https://pines-makes-website.github.io/
 * (repo named `pines-makes-website.github.io`, source `/docs`).
 * Use `'/repo-name/'` only for project pages at https://<user>.github.io/<repo-name>/.
 */
const GITHUB_PAGES_BASE = '/';

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
  return {
    base: GITHUB_PAGES_BASE,
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
