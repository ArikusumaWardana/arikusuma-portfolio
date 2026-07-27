import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/tech-stack',
    name: 'Tech Stack',
    component: () => import('../views/SkillView.vue')
  },
  {
    path: '/tools',
    name: 'Tools',
    component: () => import('../views/ToolsView.vue')
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../views/ProjectsView.vue')
  },
  {
    path: '/experiences',
    name: 'Experiences',
    component: () => import('../views/ExperiencesView.vue')
  },
  {
    path: '/volunteers',
    name: 'Volunteers',
    component: () => import('../views/VolunteersView.vue')
  }
]
