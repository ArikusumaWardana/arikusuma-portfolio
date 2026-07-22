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
          return savedPosition
        } else {
          return { top: 0 }
        }
      }
    }
  },
  ({ app, router, routes, isClient, initialState }) => {
    // Custom setup if needed
  }
)
