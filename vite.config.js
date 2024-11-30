import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
    build: {
        outDir: 'dist',
        rollupOptions: {
            output: {
                manualChunks: {
                    three: ['three']
                }
            }
        },
        // Enable minification and tree-shaking
        minify: 'terser',
        terserOptions: {
            compress: {
                // Remove unused code
                pure_funcs: ['console.log'],
                passes: 2
            }
        }
    },
    optimizeDeps: {
        include: ['three']
    },
    plugins: [
        // visualizer({
        //     template: 'treemap', // or 'sunburst', 'network'
        //     open: false,         // automatically open the report in default browser
        //     gzipSize: true,     // show gzipped sizes
        //     brotliSize: true,   // show brotli sizes
        //     filename: 'stats.html' // will be saved in project's root
        // })
    ]
});
