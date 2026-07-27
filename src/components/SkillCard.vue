<template>
  <div class="card skill-card">
    <div class="skill-icon">
      <component :is="icon" :size="28" />
    </div>
    <h3 class="skill-name">{{ name }}</h3>
    <span class="skill-level" :class="levelClass">{{ level }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  level: {
    type: String,
    default: 'Beginner', // Beginner, Intermediate, Advanced
    validator: (value) => ['Beginner', 'Intermediate', 'Advanced'].includes(value)
  },
  icon: {
    type: [Object, Function],
    required: true
  },
  color: {
    type: String,
    default: 'primary'
  }
})

const levelClass = computed(() => {
  return `level-${props.level.toLowerCase()}`
})
</script>

<style scoped>
.skill-card {
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

.skill-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-accent);
  box-shadow: var(--shadow-md);
}

.skill-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: var(--radius-md);
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  color: var(--color-accent-text);
  transition: all var(--duration-fast) var(--ease-standard);
}

.skill-card:hover .skill-icon {
  background: var(--color-accent-muted);
  border-color: var(--color-accent);
}

.skill-name {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.skill-level {
  font-size: 0.725rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background: var(--color-surface-raised);
  color: var(--color-text-secondary);
}

.level-beginner {
  border-color: var(--color-border);
  color: var(--color-text-secondary);
}

.level-intermediate {
  border-color: var(--color-accent);
  background: var(--color-accent-muted);
  color: var(--color-accent-text);
}

.level-advanced {
  border-color: var(--color-accent);
  background: var(--color-accent);
  color: #0A0A0C;
  font-weight: 700;
}
</style>
