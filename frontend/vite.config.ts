import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Varmistaa, että public-kansion sisältö (ml. _redirects) kopioidaan distiin buildissa
export default defineConfig({
  plugins: [vue()],
  publicDir: 'public', // tämä on oletus, mutta määritellään selkeyden vuoksi
})
