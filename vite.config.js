import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import ModuleData from './module.json' with { type: 'json' };

const sourcemap = true;
const compress = false;

export default defineConfig({
    root: 'src/',
    base: `/${ModuleData.id}/`,
    publicDir: false,
    cacheDir: '../.vite-cache', // Relative from root directory

    resolve: {
        conditions: ['import', 'browser'],
        alias: {
            '~': resolve(__dirname, 'src'),
        }
    },

    esbuild: {
        target: ['es2022']
    },

    css: {},

    define: {
        'process.env': {}
    },

    server: {
        port: 29999,
        open: '/game',
        proxy: {
            [`^(/${ModuleData.id}/(images|assets|languages|packs|style.css))`]: 'http://localhost:30000',

            [`^(?!/${ModuleData.id}/)`]: 'http://localhost:30000',

            '/socket.io': { target: 'ws://localhost:30000', ws: true }
        }
    },

    build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: false,
        sourcemap: sourcemap,
        reportCompressedSize: true,
        minify: compress ? 'terser' : false,
        target: ['es2022'],
        terserOptions: compress ? { ...terserConfig(), ecma: 2022 } : void 0,
        lib: {
            entry: './scripts/main.mjs',
            formats: ['es'],
            fileName: 'main'
        }
    },

    optimizeDeps: {
        esbuildOptions: {
            target: 'es2022'
        }
    },

    plugins: [vue()]
});
