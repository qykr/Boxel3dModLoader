import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig(({ mode }) => {
  const isMinify = mode === 'minify'

  return {
    plugins: [svelte({
      compilerOptions: {
        css: 'injected'
      }
    })],
    build: {
      minify: isMinify ? 'esbuild' : false,
      rollupOptions: {
        input: "runtime/index.ts",
        output: {
          entryFileNames: isMinify ? `bml.min.js` : `bml.js`,
        },
      },
      cssCodeSplit: false,
      emptyOutDir: false,
    },
  }
})