import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import generateSitemap from 'vite-ssg-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  ssgOptions: {
    onFinished() {
      generateSitemap({
        hostname: 'https://arikusuma-wardana.vercel.app/',
        readable: true,
      })
    },
  },
})
