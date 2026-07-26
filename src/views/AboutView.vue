<template>
  <div class="page about-page">
    <div class="about-content animate-fadeIn">
      <div class="page-title">
        <h2><span class="gradient-text">About Me</span></h2>
        <p>Get to know me better</p>
      </div>

      <div class="about-card glass-card">
        <div class="about-header">
          <User :size="32" class="about-icon" />
        </div>

        <div class="about-body">
          <h2>Hello, I'm <span class="gradient-text">Arikusuma Wardana</span></h2>

          <p>
            My full name is <strong>Kadek Agus Arikusuma Wardana</strong> (often called <strong>Arikusuma</strong>). I'm an Informatics student at Primakara University with a background in full-stack web development. I enjoy turning ideas into usable products, from clean interfaces on the front end to solid logic on the back end.
          </p>

          <p>
            Right now, I'm diving deeper into game development, especially with Unity. I've been handling several game projects, which helps me learn more about gameplay, performance, and creating better player experiences. I'm always open to learning, collaborating, and building things that people actually enjoy using.
          </p>

          <div class="about-highlights">
            <div class="highlight-item">
              <Code :size="20" />
              <span>Web Dev</span>
            </div>
            <div class="highlight-item">
              <Palette :size="20" />
              <span>Game Dev</span>
            </div>
            <div class="highlight-item">
              <Rocket :size="20" />
              <span>Collaborating</span>
            </div>
            <div class="highlight-item">
              <Heart :size="20" />
              <span>Building things</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { User, Code, Palette, Rocket, Heart } from 'lucide-vue-next'
import { useHead } from '@unhead/vue'
import { seoConfig } from '../config/seo'

useHead({
  title: 'About',
  meta: [
    {
      name: 'description',
      content: `Learn more about ${seoConfig.fullName} (${seoConfig.displayName} / ${seoConfig.nickName}). Discover my background, university study, and professional interests.`
    },
    {
      name: 'keywords',
      content: `About ${seoConfig.fullName}, About ${seoConfig.displayName}, ${seoConfig.nickName}, bio, developer profile, Primakara University`
    },
    // Open Graph
    {
      property: 'og:title',
      content: `About | ${seoConfig.displayName}`
    },
    {
      property: 'og:description',
      content: `Learn more about ${seoConfig.fullName} (${seoConfig.displayName} / ${seoConfig.nickName}), Web Developer and Game Developer.`
    },
    // Twitter Cards
    {
      name: 'twitter:title',
      content: `About | ${seoConfig.displayName}`
    },
    {
      name: 'twitter:description',
      content: `Learn more about ${seoConfig.fullName} (${seoConfig.displayName} / ${seoConfig.nickName}), Web Developer and Game Developer.`
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": `${seoConfig.siteUrl}/about/#webpage`,
        "url": `${seoConfig.siteUrl}/about`,
        "name": `About ${seoConfig.displayName}`,
        "description": `Learn more about ${seoConfig.fullName} (${seoConfig.displayName} / ${seoConfig.nickName}), Web Developer and Game Developer.`,
        "isPartOf": {
          "@id": `${seoConfig.siteUrl}/#website`
        },
        "about": {
          "@id": `${seoConfig.siteUrl}/#person`
        }
      })
    }
  ]
})
</script>

<style scoped>
.about-page {
  padding-top: calc(70px + var(--space-2xl));
  padding-bottom: var(--space-3xl);
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

.about-card {
  margin-top: var(--space-xl);
  overflow: hidden;
}

.about-header {
  background: var(--gradient-primary);
  padding: var(--space-xl);
  display: flex;
  justify-content: center;
}

.about-icon {
  color: white;
  padding: var(--space-md);
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-full);
}

.about-body {
  padding: var(--space-2xl);
}

.about-body h2 {
  font-size: 1.75rem;
  margin-bottom: var(--space-lg);
}

.about-body p {
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: var(--space-md);
}

.about-body p:last-of-type {
  margin-bottom: var(--space-xl);
}

.about-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  margin-top: var(--space-lg);
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  background: var(--bg-secondary);
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
}

.highlight-item svg {
  color: var(--primary);
}

@media (max-width: 480px) {
  .about-body {
    padding: var(--space-lg);
  }

  .about-highlights {
    justify-content: center;
  }
}
</style>
