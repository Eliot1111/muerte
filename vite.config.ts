import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

function resolveBaseUrl(env: Record<string, string>): string {
  if (env.VITE_BASE_URL) {
    return env.VITE_BASE_URL.endsWith('/')
      ? env.VITE_BASE_URL
      : `${env.VITE_BASE_URL}/`;
  }

  // GitHub Actions: project Pages URL is /{repo}/
  if (process.env.GITHUB_ACTIONS === 'true') {
    const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
    if (repo) return `/${repo}/`;
  }

  return '/';
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProd = mode === 'production';

  return {
    base: resolveBaseUrl(env),
    plugins: [react()],
    build: {
      target: 'es2022',
      outDir: 'dist',
      sourcemap: false,
      cssMinify: true,
      minify: 'esbuild',
      chunkSizeWarningLimit: 1600,
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          manualChunks: {
            three: ['three', '@react-three/fiber', '@react-three/drei'],
            postprocessing: ['@react-three/postprocessing', 'postprocessing'],
            motion: ['framer-motion'],
            gsap: ['gsap'],
          },
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
    },
    server: {
      port: 5173,
      strictPort: false,
    },
    preview: {
      port: 4173,
      host: true,
      strictPort: false,
    },
    esbuild: {
      drop: isProd ? ['console', 'debugger'] : [],
    },
  };
});
