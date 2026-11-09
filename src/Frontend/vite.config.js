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
        include: ['tests/**/*.{test,spec}.{js,jsx}'],
        environment: 'jsdom',
        setupFiles: './tests/setup.js',
        clearMocks: true,
        restoreMocks: true
    }
})
