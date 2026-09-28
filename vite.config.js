import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import generateSitemap from 'vite-ssg-sitemap'

function pdfHeadersPlugin() {
  return {
    name: 'pdf-headers',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.includes('.pdf')) {
          res.setHeader('Content-Type', 'application/pdf')
          res.setHeader('Content-Disposition', 'inline; filename="CV_Kadek_Agus_Arikusuma_Wardana.pdf"')
        }
        next()
      })
    }
  }
}

export default defineConfig({
  plugins: [vue(), pdfHeadersPlugin()],
  ssgOptions: {
    onFinished() {
      generateSitemap({
        hostname: 'https://www.arikusuma-wardana.my.id/',
        readable: true,
      })
    },
  },
})
