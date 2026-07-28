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
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  transition: transform var(--duration-base) var(--ease-standard), border-color var(--duration-base) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard);
  position: relative;
  overflow: hidden;
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

.skill-card:nth-child(2n) {
  animation-duration: 5.5s;
  animation-delay: -1.5s;
}

.skill-card:nth-child(3n) {
  animation-duration: 6.5s;
  animation-delay: -3s;
}

.skill-card:nth-child(4n) {
  animation-duration: 7s;
  animation-delay: -4.5s;
}

.skill-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: -150%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.05),
    transparent
  );
  transform: skewX(-25deg);
  z-index: 1;
}

.skill-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-accent);
  box-shadow: 0 8px 24px -8px var(--color-accent-muted);
}

.skill-card:hover::after {
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    left: -150%;
  }
  100% {
    left: 250%;
  }
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
  position: relative;
  z-index: 2;
}

@keyframes pulseIcon {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.skill-card:hover .skill-icon {
  background: var(--color-accent-muted);
  border-color: var(--color-accent);
  animation: pulseIcon 1.5s ease-in-out infinite;
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
