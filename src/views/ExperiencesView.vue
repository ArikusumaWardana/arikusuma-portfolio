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
          :key="exp.title + exp.organization"
          class="timeline-item"
          :class="`delay-${(index + 1) * 100}`"
        >
          <!-- Timeline Node Marker -->
          <div class="timeline-marker" :class="{ 'is-current': exp.isCurrent }">
            <div class="marker-ring">
              <span class="marker-dot"></span>
            </div>
          </div>

          <!-- Timeline Content Card -->
          <div class="card timeline-card">
            <div class="timeline-header">
              <div class="title-group">
                <h3 class="timeline-title">{{ exp.title }}</h3>
                <div class="timeline-org">
                  <Briefcase :size="15" />
                  <span>{{ exp.organization }}</span>
                </div>
              </div>
              <div class="date-badge-group">
                <span class="timeline-date" :class="{ 'current-badge': exp.isCurrent }">
                  <span v-if="exp.isCurrent" class="pulse-dot"></span>
                  {{ exp.startDate }} - {{ exp.endDate }}
                </span>
              </div>
            </div>

            <div class="timeline-body" v-if="exp.description">
              <ul class="timeline-highlights">
                <li v-for="(item, i) in exp.description" :key="i">
                  <span class="bullet-icon">▹</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <div class="timeline-footer" v-if="exp.skills && exp.skills.length">
              <div class="tech-tags">
                <span v-for="skill in exp.skills" :key="skill" class="tech-tag">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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

const experiences = [
  {
    title: 'Game Programmer',
    organization: 'Palm Game Studio',
    startDate: 'Aug 2025',
    endDate: 'Present',
    isCurrent: true,
    skills: ['Unity', 'C#', 'Plastic SCM', 'Gameplay Logic', 'AI System'],
    description: [
      'Building and maintaining core game systems in Unity with C#',
      'Implementing fluid player controls, AI behaviors, and interactive mechanics',
      'Version control management and team workflow using Plastic SCM'
    ]
  },
  {
    title: 'Junior Game Programmer',
    organization: 'Socks.Studio',
    startDate: 'Dec 2025',
    endDate: 'Mei 2026',
    isCurrent: false,
    skills: ['Unity', 'C#', 'Game Optimization', 'Gameplay Mechanics'],
    description: [
      'Developing gameplay mechanics and interactive features using Unity',
      'Collaborating with designers and artists to implement game systems seamlessly',
      'Optimizing game performance and troubleshooting complex technical bugs'
    ]
  },
  {
    title: 'Head of Tech Support',
    organization: 'GDGoC Primakara',
    startDate: 'Nov 2024',
    endDate: 'Oct 2025',
    isCurrent: false,
    skills: ['Technical Leadership', 'Event Facilitation', 'Community Support'],
    description: [
      'Leading technical support team for the Google Developer Student Club community',
      'Organizing and facilitating tech workshops, hackathons, and community events',
      'Providing technical assistance and hardware/software troubleshooting for members'
    ]
  },
  {
    title: 'Web Developer',
    organization: 'Bamboomedia',
    startDate: 'Dec 2021',
    endDate: 'Feb 2022',
    isCurrent: false,
    skills: ['HTML/CSS', 'PHP', 'JavaScript', 'Responsive Design'],
    description: [
      'Developed responsive web applications using modern web technologies',
      'Collaborated closely with cross-functional teams to deliver projects on schedule',
      'Fixed functional bugs and optimized overall website performance'
    ]
  }
]
</script>

<style scoped>
.experiences-page {
  padding-top: calc(70px + var(--space-4));
  padding-bottom: var(--space-5);
  justify-content: flex-start;
}

.experiences-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 var(--space-4);
  width: 100%;
}

.timeline {
  position: relative;
  margin-top: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

/* Timeline Spine Line */
.timeline::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 12px;
  bottom: 24px;
  width: 2px;
  background: linear-gradient(
    180deg,
    var(--color-accent) 0%,
    rgba(0, 217, 163, 0.3) 60%,
    var(--color-border) 100%
  );
  z-index: 1;
}

.timeline-item {
  position: relative;
  display: flex;
  align-items: flex-start;
}

/* Marker Node */
.timeline-marker {
  position: absolute;
  left: 0;
  top: 22px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.marker-ring {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--color-bg);
  border: 2px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.marker-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-border);
  transition: all 0.3s ease;
}

.timeline-item:hover .marker-ring {
  border-color: var(--color-accent);
  box-shadow: 0 0 12px rgba(0, 217, 163, 0.4);
}

.timeline-item:hover .marker-dot {
  background: var(--color-accent);
}

.is-current .marker-ring {
  border-color: var(--color-accent);
  box-shadow: 0 0 10px rgba(0, 217, 163, 0.3);
}

.is-current .marker-dot {
  background: var(--color-accent);
}

/* Timeline Card */
.timeline-card {
  width: 100%;
  margin-left: 48px;
  padding: var(--space-4) var(--space-5);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  animation: cardFloat 6s ease-in-out infinite, borderPulse 4s ease-in-out infinite;
}

.timeline-card::after {
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
  z-index: 2;
  pointer-events: none;
}

.timeline-card:hover::after {
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

@keyframes cardFloat {
  0%, 100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, -6px, 0);
  }
}

@keyframes borderPulse {
  0%, 100% {
    border-color: var(--color-border);
  }
  50% {
    border-color: rgba(0, 217, 163, 0.25);
  }
}

.timeline-item:nth-child(2n) .timeline-card {
  animation-duration: 5.5s, 4s;
  animation-delay: -1.5s, -1s;
}

.timeline-item:nth-child(3n) .timeline-card {
  animation-duration: 6.5s, 4s;
  animation-delay: -3s, -2s;
}

.timeline-item:nth-child(4n) .timeline-card {
  animation-duration: 7s, 4s;
  animation-delay: -4.5s, -3s;
}

.timeline-card:hover {
  transform: translate3d(0, -4px, 0) !important;
  border-color: var(--color-accent);
  box-shadow: 0 8px 24px -8px var(--color-accent-muted);
}

/* Header */
.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
  flex-wrap: wrap;
}

.title-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.timeline-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.3;
}

.timeline-org {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-accent-text);
}

.timeline-org svg {
  color: var(--color-accent);
}

/* Dates & Badges */
.timeline-date {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.775rem;
  font-weight: 600;
  padding: 5px 12px;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  border-radius: var(--radius-full);
  white-space: nowrap;
}

.timeline-date.current-badge {
  border-color: var(--color-accent);
  color: var(--color-accent-text);
  background: var(--color-accent-muted);
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 6px var(--color-accent);
  animation: dotPulse 1.5s ease-in-out infinite;
}

@keyframes dotPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.3);
  }
}

/* Body / Highlights */
.timeline-body {
  margin-bottom: var(--space-3);
}

.timeline-highlights {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.timeline-highlights li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.bullet-icon {
  color: var(--color-accent);
  font-weight: bold;
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Footer / Tech Tags */
.timeline-footer {
  padding-top: var(--space-2);
  border-top: 1px dashed var(--color-border);
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tech-tag {
  font-size: 0.725rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 3px 9px;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  border-radius: var(--radius-sm);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .experiences-page {
    padding-left: var(--space-3);
    padding-right: var(--space-3);
  }

  .experiences-content {
    padding: 0;
    width: 100%;
  }

  .timeline {
    margin-top: var(--space-4);
  }

  .timeline::before {
    left: 10px;
  }

  .timeline-marker {
    left: -5px;
    top: 20px;
  }

  .timeline-card {
    margin-left: 26px;
    padding: var(--space-4);
  }

  .timeline-header {
    flex-direction: column;
    gap: var(--space-2);
  }

  .timeline-date {
    align-self: flex-start;
  }
}

@media (max-width: 480px) {
  .experiences-page {
    padding-left: 10px;
    padding-right: 10px;
  }

  .timeline::before {
    left: 8px;
  }

  .timeline-marker {
    left: -7px;
  }

  .timeline-card {
    margin-left: 20px;
    padding: 14px 12px;
  }

  .timeline-title {
    font-size: 1.05rem;
  }

  .timeline-org {
    font-size: 0.85rem;
  }

  .timeline-highlights li {
    font-size: 0.85rem;
  }

  .tech-tag {
    font-size: 0.7rem;
    padding: 2px 7px;
  }
}
</style>
