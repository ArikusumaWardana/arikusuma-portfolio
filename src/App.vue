<template>
  <div id="app-wrapper">
    <ParticleBackground />
    <Navbar />
    <h1 class="sr-only">Arikusuma Wardana - Web Developer & Game Developer</h1>
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import ParticleBackground from './components/ParticleBackground.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

useHead({
  titleTemplate: (title) => title ? `${title} — Arikusuma Wardana` : 'Arikusuma Wardana — Web Developer & Game Developer Portfolio',
  meta: [
    {
      name: 'description',
      content: 'Arikusuma Wardana is a Web Developer & Game Developer. Explore my creative projects built with Vue.js, Vue Router, Vite, and JavaScript.'
    }
  ]
})
</script>

<style>
#app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.main-content {
  flex: 1;
  position: relative;
  z-index: var(--z-content, 1);
}

/* Page Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
