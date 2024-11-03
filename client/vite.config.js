import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@lottiefiles/dotlottie-wc'], // Asegura que Vite procese el paquete
  },
  build: {
    rollupOptions: {
      external: ['@lottiefiles/dotlottie-wc'], // Evita incluirlo en el build
    }
  }
})
