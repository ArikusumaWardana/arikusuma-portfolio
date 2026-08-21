<template>
  <div class="page skill-page">
    <div class="skill-content animate-fadeIn">
      <div class="page-title">
        <h2>My <span class="text-accent">Tech Stack</span></h2>
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
          :class="`delay-${((index % 5) + 1) * 100}`"
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
  title: 'Tech Stack',
  meta: [
    {
      name: 'description',
      content: `Discover tech stack, programming languages, and framework expertise of ${seoConfig.fullName} (${seoConfig.displayName}).`
    },
    {
      name: 'keywords',
      content: `tech stack, developer skills, technologies, HTML, CSS, JavaScript, TypeScript, PHP, C#, Vue.js, Laravel, Unity, ${seoConfig.displayName}`
    },
    {
      property: 'og:title',
      content: `Tech Stack | ${seoConfig.displayName}`
    },
    {
      property: 'og:description',
      content: `Discover tech stack, programming languages, and framework expertise of ${seoConfig.fullName} (${seoConfig.displayName}).`
    },
    {
      name: 'twitter:title',
      content: `Tech Stack | ${seoConfig.displayName}`
    },
    {
      name: 'twitter:description',
      content: `Discover tech stack, programming languages, and framework expertise of ${seoConfig.fullName} (${seoConfig.displayName}).`
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${seoConfig.siteUrl}/tech-stack/#webpage`,
        "url": `${seoConfig.siteUrl}/tech-stack`,
        "name": `Tech Stack of ${seoConfig.displayName}`,
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
  { name: 'HTML', level: 'Intermediate', icon: Globe, color: 'teal' },
  { name: 'CSS', level: 'Intermediate', icon: Palette, color: 'teal' },
  { name: 'JavaScript', level: 'Beginner', icon: Braces, color: 'teal' },
  { name: 'TypeScript', level: 'Beginner', icon: Code, color: 'teal' },
  { name: 'PHP', level: 'Beginner', icon: FileCode, color: 'teal' },
  { name: 'C#', level: 'Intermediate', icon: Cpu, color: 'teal' },
  { name: 'SQL', level: 'Intermediate', icon: Database, color: 'teal' },
  { name: 'PostgreSQL', level: 'Beginner', icon: Database, color: 'teal' },
  { name: 'Laravel', level: 'Beginner', icon: Layers, color: 'teal' },
  { name: 'Vue.js', level: 'Beginner', icon: Boxes, color: 'teal' },
  { name: 'Next.js', level: 'Intermediate', icon: Code, color: 'teal' },
  { name: 'Tailwind CSS', level: 'Intermediate', icon: Palette, color: 'teal' },
  { name: 'Bootstrap', level: 'Beginner', icon: Layers, color: 'teal' },
  { name: 'Prisma', level: 'Beginner', icon: Database, color: 'teal' },
  { name: 'Git', level: 'Beginner', icon: Terminal, color: 'teal' }
]
</script>

<style scoped>
.skill-page {
  padding-top: calc(70px + var(--space-4));
  padding-bottom: var(--space-5);
}

.skill-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

.skills-grid {
  margin-top: var(--space-4);
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
