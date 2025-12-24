<template>
  <div class="page skill-page">
    <div class="skill-content animate-fadeIn">
      <div class="page-title">
        <h1><span class="gradient-text">My Skills</span></h1>
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
