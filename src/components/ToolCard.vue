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
  transition: transform var(--duration-base) var(--ease-standard), border-color var(--duration-base) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard);
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
