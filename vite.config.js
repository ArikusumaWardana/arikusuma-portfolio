import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
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
  plugins: [vue(), tailwindcss(), pdfHeadersPlugin()],
  ssgOptions: {
    onFinished() {
      generateSitemap({
        hostname: 'https://arikusuma-wardana.my.id',
        exclude: ['/about', '/experiences', '/volunteers', '/tech-stack', '/tools', '/projects'],
        generateRobotsTxt: false,
        changefreq: 'weekly',
        priority: 1.0,
        readable: true,
      })
    },
  },
})
