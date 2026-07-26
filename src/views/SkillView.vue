<template>
  <div class="page skill-page">
    <div class="skill-content animate-fadeIn">
      <div class="page-title">
        <h2><span class="gradient-text">My Skills</span></h2>
        <p>Technologies and languages I work with</p>
      </div>

      <div class="skills-grid grid grid-4">
        <SkillCard
          v-for="(skill, index) in skills"
          :key="skill.name"
          :name="skill.name"
          :level="skill.level"
          :icon="skill.icon"
          :color="skill.color"
          :class="`delay-${(index + 1) * 100}`"
          class="animate-fadeIn"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
    Boxes,
    Braces,
    Code,
    Cpu,
    Database,
    FileCode,
    Globe,
    Layers,
    Palette,
    Terminal
} from 'lucide-vue-next';
import SkillCard from '../components/SkillCard.vue';
import { useHead } from '@unhead/vue';
import { seoConfig } from '../config/seo';

useHead({
  title: 'Skills',
  meta: [
    {
      name: 'description',
      content: `Discover technical skills, programming languages, and framework expertise of ${seoConfig.fullName} (${seoConfig.displayName}).`
    },
    {
      name: 'keywords',
      content: `skills, developer skills, technologies, HTML, CSS, JavaScript, TypeScript, PHP, C#, Vue.js, Laravel, Unity, ${seoConfig.displayName}`
    },
    // Open Graph
    {
      property: 'og:title',
      content: `Skills | ${seoConfig.displayName}`
    },
    {
      property: 'og:description',
      content: `Discover technical skills, programming languages, and framework expertise of ${seoConfig.fullName} (${seoConfig.displayName}).`
    },
    // Twitter Cards
    {
      name: 'twitter:title',
      content: `Skills | ${seoConfig.displayName}`
    },
    {
      name: 'twitter:description',
      content: `Discover technical skills, programming languages, and framework expertise of ${seoConfig.fullName} (${seoConfig.displayName}).`
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${seoConfig.siteUrl}/skill/#webpage`,
        "url": `${seoConfig.siteUrl}/skill`,
        "name": `Skills of ${seoConfig.displayName}`,
        "description": `Technical skills and technologies mastered by ${seoConfig.fullName}.`,
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

const skills = [
  { name: 'HTML', level: 'Intermediate', icon: Globe, color: 'orange' },
  { name: 'CSS', level: 'Intermediate', icon: Palette, color: 'blue' },
  { name: 'JavaScript', level: 'Beginner', icon: Braces, color: 'orange' },
  { name: 'TypeScript', level: 'Beginner', icon: Code, color: 'blue' },
  { name: 'PHP', level: 'Beginner', icon: FileCode, color: 'purple' },
  { name: 'C#', level: 'Beginner', icon: Cpu, color: 'purple' },
  { name: 'SQL', level: 'Beginner', icon: Database, color: 'blue' },
  { name: 'Laravel', level: 'Beginner', icon: Layers, color: 'red' },
  { name: 'Vue.js', level: 'Beginner', icon: Boxes, color: 'green' },
  { name: 'Next.js', level: 'Beginner', icon: Code, color: 'primary' },
  { name: 'Tailwind CSS', level: 'Beginner', icon: Palette, color: 'cyan' },
  { name: 'Bootstrap', level: 'Beginner', icon: Layers, color: 'purple' },
  { name: 'Prisma', level: 'Beginner', icon: Database, color: 'cyan' },
  { name: 'Git', level: 'Beginner', icon: Terminal, color: 'orange' }
]
</script>

<style scoped>
.skill-page {
  padding-top: calc(70px + var(--space-2xl));
  padding-bottom: var(--space-3xl);
}

.skill-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

.skills-grid {
  margin-top: var(--space-xl);
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
