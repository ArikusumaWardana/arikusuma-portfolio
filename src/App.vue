<template>
  <div id="app-wrapper" class="min-h-screen bg-[#14171F] text-[#1F242D]">
    <DiamondCursor />
    <router-view />
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { seoConfig } from './config/seo'
import DiamondCursor from './components/ui/DiamondCursor.vue'
import { initLenis } from './composables/useLenis'

const route = useRoute()
let cleanupLenis = null

onMounted(async () => {
  cleanupLenis = await initLenis()
})

onUnmounted(() => {
  cleanupLenis?.()
  cleanupLenis = null
})

const canonicalUrl = computed(() => {
  const path = route.path === '/' ? '/' : route.path.replace(/\/$/, '')
  return `${seoConfig.siteUrl}${path}`
})

useHead({
  titleTemplate: (title) => (title ? `${title} | ${seoConfig.displayName}` : seoConfig.defaultTitle),
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl
    }
  ],
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
    },
    {
      property: 'og:site_name',
      content: `${seoConfig.displayName} Portfolio`
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: canonicalUrl
    },
    {
      property: 'og:image',
      content: `${seoConfig.siteUrl}${seoConfig.defaultImage}`
    },
    {
      property: 'og:locale',
      content: 'en_US'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:image',
      content: `${seoConfig.siteUrl}${seoConfig.defaultImage}`
    }
  ]
})
</script>
