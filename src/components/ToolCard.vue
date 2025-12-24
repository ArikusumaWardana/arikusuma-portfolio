<template>
  <div class="card tool-card">
    <div class="tool-icon">
      <img :src="iconUrl" :alt="name" v-if="iconUrl" />
      <component :is="icon" :size="32" v-else-if="icon" />
    </div>
    <h3 class="tool-name">{{ name }}</h3>
    <p class="tool-description">{{ description }}</p>
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
  gap: var(--space-md);
  padding: var(--space-xl);
}

.tool-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: var(--radius-lg);
  background: var(--bg-secondary);
  color: var(--primary);
  overflow: hidden;
}

.tool-icon img {
  width: 45px;
  height: 45px;
  object-fit: contain;
}

.tool-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.tool-description {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.5;
}
</style>
