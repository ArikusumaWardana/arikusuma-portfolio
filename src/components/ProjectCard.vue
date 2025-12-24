<template>
  <div class="card project-card">
    <div class="project-image">
      <img :src="image" :alt="name" />
      <div class="project-links" v-if="websiteUrl || githubUrl">
        <a
          v-if="websiteUrl"
          :href="websiteUrl"
          target="_blank"
          rel="noopener"
          class="project-link"
          title="Visit Website"
        >
          <ExternalLink :size="18" />
        </a>
        <a
          v-if="githubUrl"
          :href="githubUrl"
          target="_blank"
          rel="noopener"
          class="project-link"
          title="View on GitHub"
        >
          <Github :size="18" />
        </a>
      </div>
    </div>
    <div class="project-content">
      <h3 class="project-name">{{ name }}</h3>
      <p class="project-description">{{ description }}</p>
      <div class="project-tech">
        <span v-for="tech in techStack" :key="tech" class="tech-badge">
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
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
</script>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
}

.project-image {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: var(--bg-secondary);
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-links {
  position: absolute;
  top: var(--space-sm);
  right: var(--space-sm);
  display: flex;
  gap: var(--space-xs);
  opacity: 0;
  transform: translateY(-10px);
  transition: all var(--transition-normal);
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
  border-radius: var(--radius-full);
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  transition: all var(--transition-normal);
}

.project-link:hover {
  background: var(--gradient-primary);
  color: white;
  border-color: transparent;
  transform: scale(1.1);
}

.project-content {
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.project-name {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-primary);
}

.project-description {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-top: var(--space-sm);
}

.tech-badge {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: var(--space-xs) var(--space-sm);
  background: var(--gradient-primary);
  color: white;
  border-radius: var(--radius-full);
}
</style>
