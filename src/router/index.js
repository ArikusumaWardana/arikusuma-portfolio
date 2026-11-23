import HomeView from '../views/HomeView.vue'

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { section: 'hero' }
  },
  {
    path: '/about',
    name: 'About',
    component: HomeView,
    meta: { section: 'about' }
  },
  {
    path: '/experiences',
    name: 'Experiences',
    component: HomeView,
    meta: { section: 'experience' }
  },
  {
    path: '/volunteers',
    name: 'Volunteers',
    component: HomeView,
    meta: { section: 'experience' }
  },
  {
    path: '/tech-stack',
    name: 'Tech Stack',
    component: HomeView,
    meta: { section: 'skills' }
  },
  {
    path: '/tools',
    name: 'Tools',
    component: HomeView,
    meta: { section: 'tech-stack' }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: HomeView,
    meta: { section: 'projects' }
  }
]
