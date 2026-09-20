import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// A aplicação roda na raiz do domínio, então `base` fica no padrão ('/').
// O build gera uma pasta `dist/` estática, pronta para ser servida por Nginx/Caddy.
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
  },
})
