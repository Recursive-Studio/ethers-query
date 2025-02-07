import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    external: ['react', '@tanstack/react-query', 'ethers'],
    esbuildOptions(options) {
        options.resolveExtensions = ['.ts', '.tsx']
    }
});
