<template>
  <div class="card tool-card">
    <div class="tool-icon">
      <img :src="iconUrl" :alt="name" loading="lazy" v-if="iconUrl" />
      <component :is="icon" :size="32" v-else-if="icon" />
    </div>
    <h3 class="tool-name">{{ name }}</h3>
    <p class="tool-description" v-if="description">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: [Object, Function],
    default: null
  },
  iconUrl: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.tool-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-3);
  padding: var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  transition: transform var(--duration-base) var(--ease-standard), border-color var(--duration-base) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard);
  animation: cardFloat 6s ease-in-out infinite, borderPulse 4s ease-in-out infinite;
}

@keyframes borderPulse {
  0%, 100% {
    border-color: var(--color-border);
  }
  50% {
    border-color: rgba(0, 217, 163, 0.25);
  }
}

@keyframes cardFloat {
  0%, 100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, -6px, 0);
  }
}

.tool-card:nth-child(2n) {
  animation-duration: 5.5s;
  animation-delay: -1.5s;
}

.tool-card:nth-child(3n) {
  animation-duration: 6.5s;
  animation-delay: -3s;
}

.tool-card:nth-child(4n) {
  animation-duration: 7s;
  animation-delay: -4.5s;
}

.tool-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-accent);
  box-shadow: var(--shadow-md);
}

.tool-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  color: var(--color-accent-text);
  overflow: hidden;
  transition: all var(--duration-fast) var(--ease-standard);
}

.tool-card:hover .tool-icon {
  background: var(--color-accent-muted);
  border-color: var(--color-accent);
}

.tool-icon img {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

.tool-name {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.tool-description {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}
</style>
