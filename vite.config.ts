import { defineConfig } from 'vite'

export default defineConfig({
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