import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 這裡設定 base 是為了讓 GitHub Pages 能正確讀取路徑
  // 如果您的網址是 https://beebi01.github.io/bibo/，這裡就要設為 '/bibo/'
  base: '/bibo/', 
})
