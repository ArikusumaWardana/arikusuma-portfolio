<template>
  <div class="relative w-full overflow-x-clip">
    <NavigationOverlay />
    <main>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ServicesSection />
      <SkillsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <TechEcosystemSection />
      <ContactSection />
    </main>
  </div>
</template>

<script setup>
import { nextTick, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { seoConfig } from '../config/seo'
import { scrollToSection } from '../composables/useLenis'
import NavigationOverlay from '../components/layout/NavigationOverlay.vue'
import HeroSection from '../components/sections/HeroSection.vue'
import AboutSection from '../components/sections/AboutSection.vue'
import ExperienceSection from '../components/sections/ExperienceSection.vue'
import ServicesSection from '../components/sections/ServicesSection.vue'
import SkillsSection from '../components/sections/SkillsSection.vue'
import ProjectsSection from '../components/sections/ProjectsSection.vue'
import TestimonialsSection from '../components/sections/TestimonialsSection.vue'
import TechEcosystemSection from '../components/sections/TechEcosystemSection.vue'
import ContactSection from '../components/sections/ContactSection.vue'

const route = useRoute()

function scrollToTarget(sectionId) {
  scrollToSection(sectionId)
}

onMounted(async () => {
  await nextTick()
  const hashId = route.hash ? route.hash.slice(1) : ''
  const targetId = hashId || route.meta?.section
  if (targetId && targetId !== 'hero') {
    requestAnimationFrame(() => scrollToTarget(targetId))
  }
})

watch(
  () => [route.meta?.section, route.hash],
  async ([section, hash]) => {
    await nextTick()
    const targetId = hash ? hash.slice(1) : section
    if (targetId) {
      scrollToTarget(targetId)
    }
  }
)

useHead({
  title: '',
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
      property: 'og:title',
      content: seoConfig.defaultTitle
    },
    {
      property: 'og:description',
      content: seoConfig.defaultDescription
    },
    {
      property: 'og:url',
      content: seoConfig.siteUrl
    },
    {
      name: 'twitter:title',
      content: seoConfig.defaultTitle
    },
    {
      name: 'twitter:description',
      content: seoConfig.defaultDescription
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': `${seoConfig.siteUrl}/#person`,
            name: seoConfig.fullName,
            additionalName: seoConfig.nickName,
            alternateName: [seoConfig.displayName, seoConfig.nickName, 'Kadek Arikusuma'],
            jobTitle: ['Web Developer', 'Game Developer', 'Game Programmer'],
            url: seoConfig.siteUrl,
            image: `${seoConfig.siteUrl}/profile.webp`,
            sameAs: [
              seoConfig.socialLinks.github,
              seoConfig.socialLinks.linkedin,
              seoConfig.socialLinks.instagram
            ],
            knowsAbout: [
              'Web Development',
              'Game Development',
              'Vue.js',
              'Next.js',
              'Laravel',
              'Vite',
              'C#',
              'Unity',
              'JavaScript',
              'TypeScript'
            ],
            alumniOf: {
              '@type': 'CollegeOrUniversity',
              name: 'Primakara University'
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Denpasar',
              addressRegion: 'Bali',
              addressCountry: 'ID'
            }
          },
          {
            '@type': 'WebSite',
            '@id': `${seoConfig.siteUrl}/#website`,
            url: seoConfig.siteUrl,
            name: `${seoConfig.displayName} Portfolio`,
            alternateName: ['Arikusuma Portfolio', 'Arikusuma Wardana Portfolio'],
            publisher: {
              '@id': `${seoConfig.siteUrl}/#person`
            },
            description: seoConfig.defaultDescription
          },
          {
            '@type': 'WebPage',
            '@id': `${seoConfig.siteUrl}/#webpage`,
            url: seoConfig.siteUrl,
            name: seoConfig.defaultTitle,
            isPartOf: {
              '@id': `${seoConfig.siteUrl}/#website`
            },
            about: {
              '@id': `${seoConfig.siteUrl}/#person`
            },
            description: seoConfig.defaultDescription
          }
        ]
      })
    }
  ]
})
</script>
