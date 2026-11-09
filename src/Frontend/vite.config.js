import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(),],
    server: {
        open: true
    },
    test: {
        environment: 'jsdom',
        setupFiles: './test/setup.js',
        clearMocks: true,
        restoreMocks: true
    }
})
