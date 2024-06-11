import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import svgr from '@svgr/rollup';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],                           //svgr :SVG파일 불러올 경우
  resolve: {
    alias: {        //절대 경로 설정
      '@': path.resolve(__dirname, 'src'),        
      '@components': path.resolve(__dirname, 'src/components'),
      '@router': path.resolve(__dirname, 'src/router'),
    },
  },
})




