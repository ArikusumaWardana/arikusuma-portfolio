<template>
  <div class="card project-card">
    <div class="project-image">
      <img :src="image" :alt="name" loading="lazy" />
      <div class="project-links" v-if="websiteUrl || githubUrl">
        <a
          v-if="websiteUrl"
          :href="websiteUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="project-link"
          title="Visit Website"
        >
          <ExternalLink :size="18" />
        </a>
        <a
          v-if="githubUrl"
          :href="githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="project-link"
          title="View on GitHub"
        >
          <Github :size="18" />
        </a>
      </div>
    </div>
    <div class="project-content">
      <h3 class="project-name">{{ name }}</h3>
      <p 
        class="project-description"
        @mouseenter="showTooltip = true"
        @mouseleave="showTooltip = false"
        @mousemove="updateTooltipPos"
      >{{ description }}</p>
      <div class="project-tech">
        <span v-for="tech in techStack" :key="tech" class="tech-badge">
          {{ tech }}
        </span>
      </div>
    </div>
    <Teleport to="body">
      <transition name="tooltip-fade">
        <div 
          v-if="showTooltip" 
          class="custom-tooltip"
          :style="{ left: tooltipX + 'px', top: tooltipY + 'px' }"
        >
          {{ description }}
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Github, ExternalLink } from 'lucide-vue-next'

defineProps({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  techStack: {
    type: Array,
    default: () => []
  },
  websiteUrl: {
    type: String,
    default: ''
  },
  githubUrl: {
    type: String,
    default: ''
  }
})

const showTooltip = ref(false)
const tooltipX = ref(0)
const tooltipY = ref(0)

const updateTooltipPos = (e) => {
  let x = e.clientX + 15
  let y = e.clientY + 15
  
  if (x + 320 > window.innerWidth) {
    x = e.clientX - 320
  }
  if (y + 100 > window.innerHeight) {
    y = e.clientY - 100
  }
  
  tooltipX.value = x
  tooltipY.value = y
}
</script>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: transform var(--duration-base) var(--ease-standard), border-color var(--duration-base) var(--ease-standard);
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-accent);
}

.project-image {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: var(--color-surface-raised);
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-base) var(--ease-standard);
}

.project-card:hover .project-image img {
  transform: scale(1.03);
}

.project-links {
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  display: flex;
  gap: var(--space-1);
  opacity: 0;
  transform: translateY(-8px);
  transition: all var(--duration-fast) var(--ease-standard);
}

.project-card:hover .project-links {
  opacity: 1;
  transform: translateY(0);
}

.project-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  transition: all var(--duration-fast) var(--ease-standard);
}

.project-link:hover {
  background: var(--color-accent);
  color: #0A0A0C;
  border-color: var(--color-accent);
  transform: scale(1.05);
}

.project-content {
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.project-name {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.project-description {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  margin-top: var(--space-2);
}

.tech-badge {
  font-size: 0.725rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 2px 8px;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  border-radius: var(--radius-sm);
}
</style>

<style>
.custom-tooltip {
  position: fixed;
  z-index: 9999;
  background: var(--color-surface-raised);
  color: var(--color-text-primary);
  padding: 12px 16px;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  max-width: 320px;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-border);
  pointer-events: none;
  line-height: 1.5;
}

.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
