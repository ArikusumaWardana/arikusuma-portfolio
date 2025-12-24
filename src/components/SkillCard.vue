<template>
  <div class="card skill-card">
    <div class="skill-icon" :style="{ background: iconBg }">
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

const iconBg = computed(() => {
  const colors = {
    primary: 'linear-gradient(135deg, hsl(210, 85%, 55%) 0%, hsl(230, 80%, 60%) 100%)',
    blue: 'linear-gradient(135deg, hsl(210, 80%, 55%) 0%, hsl(230, 80%, 60%) 100%)',
    green: 'linear-gradient(135deg, hsl(150, 70%, 45%) 0%, hsl(170, 70%, 50%) 100%)',
    orange: 'linear-gradient(135deg, hsl(30, 90%, 55%) 0%, hsl(45, 90%, 55%) 100%)',
    pink: 'linear-gradient(135deg, hsl(330, 80%, 60%) 0%, hsl(350, 80%, 60%) 100%)',
    purple: 'linear-gradient(135deg, hsl(270, 70%, 55%) 0%, hsl(290, 70%, 60%) 100%)',
    cyan: 'linear-gradient(135deg, hsl(180, 70%, 45%) 0%, hsl(200, 70%, 50%) 100%)',
    red: 'linear-gradient(135deg, hsl(0, 70%, 55%) 0%, hsl(20, 70%, 55%) 100%)',
    teal: 'linear-gradient(135deg, hsl(165, 70%, 45%) 0%, hsl(185, 70%, 50%) 100%)'
  }
  return colors[props.color] || colors.primary
})
</script>

<style scoped>
.skill-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-md);
  padding: var(--space-xl);
}

.skill-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: var(--radius-lg);
  color: white;
  box-shadow: var(--shadow-md);
}

.skill-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.skill-level {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-full);
}

.level-beginner {
  background: hsla(40, 90%, 50%, 0.15);
  color: hsl(35, 80%, 45%);
}

.level-intermediate {
  background: hsla(200, 80%, 50%, 0.15);
  color: hsl(200, 70%, 45%);
}

.level-advanced {
  background: hsla(140, 70%, 45%, 0.15);
  color: hsl(140, 60%, 40%);
}
</style>
