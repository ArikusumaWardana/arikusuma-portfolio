<template>
  <div class="page experiences-page">
    <div class="experiences-content animate-fadeIn">
      <div class="page-title">
        <h1><span class="gradient-text">My Experiences</span></h1>
        <p>My professional journey and work history</p>
      </div>

      <div class="timeline">
        <div
          v-for="(exp, index) in experiences"
          :key="index"
          class="timeline-item"
          :class="[`delay-${(index + 1) * 100}`, { expanded: hoveredIndex === index }]"
          @mouseenter="hoveredIndex = index"
          @mouseleave="hoveredIndex = null"
        >
          <div class="timeline-marker">
            <div class="marker-dot"></div>
          </div>
          <div class="timeline-content card">
            <div class="timeline-header">
              <h3 class="timeline-title">{{ exp.title }}</h3>
              <span class="timeline-date">{{ exp.startDate }} - {{ exp.endDate }}</span>
            </div>
            <p class="timeline-org">
              <Briefcase :size="16" />
              {{ exp.organization }}
            </p>
            <div class="timeline-details" v-if="exp.description">
              <ul>
                <li v-for="(item, i) in exp.description" :key="i">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Briefcase } from 'lucide-vue-next'

const hoveredIndex = ref(null)

// Experiences sorted from newest to oldest (top to bottom)
const experiences = [
  {
    title: 'Junior Game Programmer',
    organization: 'Socks.Studio',
    startDate: 'Dec 2025',
    endDate: 'Present',
    description: [
      'Developing gameplay mechanics and features using Unity',
      'Collaborating with designers and artists to implement game systems',
      'Optimizing game performance and fixing bugs'
    ]
  },
  {
    title: 'Game Programmer',
    organization: 'Palm Game Studio',
    startDate: 'Aug 2025',
    endDate: 'Present',
    description: [
      'Building and maintaining game systems in Unity with C#',
      'Implementing player controls, AI behaviors, and game logic',
      'Version control management using Plastic SCM'
    ]
  },
  {
    title: 'Head of Tech Support',
    organization: 'GDGoC Primakara',
    startDate: 'Nov 2024',
    endDate: 'Oct 2025',
    description: [
      'Leading technical support team for Google Developer community',
      'Organizing and facilitating tech workshops and events',
      'Providing technical assistance and troubleshooting for members'
    ]
  },
  {
    title: 'Web Developer',
    organization: 'Bamboomedia',
    startDate: 'Dec 2021',
    endDate: 'Feb 2022',
    description: [
      'Developed responsive web applications using modern technologies',
      'Collaborated with team to deliver projects on schedule',
      'Fixed bugs and improved website performance'
    ]
  }
]
</script>

<style scoped>
.experiences-page {
  padding-top: calc(70px + var(--space-2xl));
  padding-bottom: var(--space-3xl);
}

.experiences-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

.timeline {
  position: relative;
  margin-top: var(--space-2xl);
  padding-left: 30px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--gradient-primary);
  border-radius: var(--radius-full);
}

.timeline-item {
  position: relative;
  margin-bottom: var(--space-xl);
  animation: fadeIn 0.5s ease forwards;
  opacity: 0;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-marker {
  position: absolute;
  left: -30px;
  top: var(--space-lg);
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.marker-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--gradient-primary);
  box-shadow: 0 0 0 4px var(--bg-primary), 0 0 20px hsla(var(--primary-hue), 80%, 55%, 0.4);
  transition: transform var(--transition-normal);
}

.timeline-item:hover .marker-dot {
  transform: scale(1.3);
}

.timeline-content {
  padding: var(--space-lg);
  transition: all var(--transition-normal);
}

.timeline-item:hover .timeline-content {
  border-color: var(--primary);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-md);
  margin-bottom: var(--space-sm);
  flex-wrap: wrap;
}

.timeline-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-primary);
}

.timeline-date {
  font-size: 0.8rem;
  font-weight: 600;
  padding: var(--space-xs) var(--space-sm);
  background: var(--gradient-primary);
  color: white;
  border-radius: var(--radius-full);
  white-space: nowrap;
}

.timeline-org {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin: 0;
}

.timeline-org svg {
  color: var(--primary);
}

.timeline-details {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.4s ease;
}

.timeline-item:hover .timeline-details {
  max-height: 200px;
  opacity: 1;
  margin-top: var(--space-md);
  padding-top: var(--space-md);
  border-top: 1px solid var(--border-color);
}

.timeline-details ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.timeline-details li {
  position: relative;
  padding-left: var(--space-lg);
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.timeline-details li::before {
  content: '▹';
  position: absolute;
  left: 0;
  color: var(--primary);
  font-weight: bold;
}

@media (max-width: 600px) {
  .timeline {
    padding-left: 25px;
  }

  .timeline-marker {
    left: -25px;
  }

  .timeline-header {
    flex-direction: column;
    gap: var(--space-sm);
  }

  .timeline-date {
    align-self: flex-start;
  }
}
</style>
