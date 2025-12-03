import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: "src/loader.ts",
            output: {
                inlineDynamicImports: true,
                entryFileNames: `bml.js`,
            },
        },
        cssCodeSplit: false,
    },
})