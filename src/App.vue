<template>
  <div id="app-wrapper">
    <LiveGridBackground />
    <Navbar />
    <h1 class="sr-only">{{ seoConfig.fullName }} - Web Developer & Game Developer</h1>
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
import LiveGridBackground from './components/LiveGridBackground.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { seoConfig } from './config/seo'

useHead({
  titleTemplate: (title) => title ? `${title} | ${seoConfig.displayName}` : seoConfig.defaultTitle,
  meta: [
    {
      name: 'description',
      content: seoConfig.defaultDescription
    },
    {
      name: 'keywords',
      content: seoConfig.defaultKeywords
    },
    {
      name: 'author',
      content: seoConfig.fullName
    },
    {
      name: 'google-site-verification',
      content: seoConfig.googleSearchConsoleId
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
