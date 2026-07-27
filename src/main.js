import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import './assets/index.css'
import { routes } from './router'

export const createApp = ViteSSG(
  App,
  { 
    routes,
    routerOptions: {
      scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(savedPosition)
            }, 300)
          })
        } else {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({ top: 0, behavior: 'smooth' })
            }, 300)
          })
        }
      }
    }
  },
  ({ app, router, routes, isClient, initialState }) => {
    if (isClient) {
      import('./utils/analytics').then(({ initAnalytics, trackPageView }) => {
        initAnalytics()
        router.afterEach((to) => {
          // Track page view after routing finishes
          trackPageView(to.fullPath)
        })
      })
    }
  }
)

