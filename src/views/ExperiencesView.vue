<template>
  <div class="page experiences-page">
    <div class="experiences-content animate-fadeIn">
      <div class="page-title">
        <h2>My <span class="text-accent">Experiences</span></h2>
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
import { useHead } from '@unhead/vue'
import { seoConfig } from '../config/seo'

useHead({
  title: 'Experiences',
  meta: [
    {
      name: 'description',
      content: `Explore the career journey, work history, and professional milestones of ${seoConfig.fullName} (${seoConfig.displayName}).`
    },
    {
      name: 'keywords',
      content: `work experience, career history, jobs, Unity game developer, PHP web developer, Palm Game Studio, ${seoConfig.displayName}`
    },
    {
      property: 'og:title',
      content: `Experiences | ${seoConfig.displayName}`
    },
    {
      property: 'og:description',
      content: `Explore the career journey, work history, and professional milestones of ${seoConfig.fullName} (${seoConfig.displayName}).`
    },
    {
      name: 'twitter:title',
      content: `Experiences | ${seoConfig.displayName}`
    },
    {
      name: 'twitter:description',
      content: `Explore the career journey, work history, and professional milestones of ${seoConfig.fullName} (${seoConfig.displayName}).`
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${seoConfig.siteUrl}/experiences/#webpage`,
        "url": `${seoConfig.siteUrl}/experiences`,
        "name": `Experiences of ${seoConfig.displayName}`,
        "description": `Professional history and work experiences of ${seoConfig.fullName}.`,
        "isPartOf": {
          "@id": `${seoConfig.siteUrl}/#website`
        },
        "about": {
          "@id": `${seoConfig.siteUrl}/#person`
        }
      })
    }
  ]
})

const hoveredIndex = ref(null)

const experiences = [
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
    title: 'Junior Game Programmer',
    organization: 'Socks.Studio',
    startDate: 'Dec 2025',
    endDate: 'Mei 2026',
    description: [
      'Developing gameplay mechanics and features using Unity',
      'Collaborating with designers and artists to implement game systems',
      'Optimizing game performance and fixing bugs'
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
  padding-top: calc(70px + var(--space-4));
  padding-bottom: var(--space-5);
}

.experiences-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

.timeline {
  position: relative;
  margin-top: var(--space-5);
  padding-left: 30px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-border);
}

.timeline-item {
  position: relative;
  margin-bottom: var(--space-4);
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-marker {
  position: absolute;
  left: -30px;
  top: var(--space-4);
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.marker-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-surface);
  border: 2px solid var(--color-accent);
  transition: transform var(--duration-fast) var(--ease-standard), background-color var(--duration-fast) var(--ease-standard);
}

.timeline-item:hover .marker-dot {
  transform: scale(1.25);
  background: var(--color-accent);
}

.timeline-content {
  padding: var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all var(--duration-base) var(--ease-standard);
}

.timeline-item:hover .timeline-content {
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-3);
  margin-bottom: var(--space-2);
  flex-wrap: wrap;
}

.timeline-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.timeline-date {
  font-size: 0.775rem;
  font-weight: 600;
  padding: 4px 10px;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  color: var(--color-accent);
  border-radius: var(--radius-sm);
  white-space: nowrap;
}

.timeline-org {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  margin: 0;
}

.timeline-org svg {
  color: var(--color-accent);
}

.timeline-details {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: all var(--duration-base) var(--ease-standard);
}

.timeline-item:hover .timeline-details {
  max-height: 300px;
  opacity: 1;
  margin-top: var(--space-3);
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-border);
}

.timeline-details ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.timeline-details li {
  position: relative;
  padding-left: var(--space-4);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.timeline-details li::before {
  content: '▹';
  position: absolute;
  left: 0;
  color: var(--color-accent);
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
    gap: var(--space-2);
  }

  .timeline-date {
    align-self: flex-start;
  }
}
</style>
