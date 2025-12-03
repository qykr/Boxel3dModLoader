import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: "src/inject/index.ts",
            output: {
                inlineDynamicImports: true,
                entryFileNames: `bml.js`,
            },
        },
        cssCodeSplit: false,
    },
})