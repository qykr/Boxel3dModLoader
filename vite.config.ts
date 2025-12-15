import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
    plugins: [svelte()],
    build: {
        rollupOptions: {
            input: "runtime/index.ts",
            output: {
                entryFileNames: `bml.js`,
            },
        },
        cssCodeSplit: false,
    },
})