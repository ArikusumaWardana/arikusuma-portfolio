<template>
  <div class="page about-page">
    <div class="about-content animate-fadeIn">
      <!-- Title Header -->
      <div class="page-title">
        <h2>About <span class="text-accent">Me</span></h2>
        <p>Get to know my background, technical expertise, and passion</p>
      </div>

      <!-- Hero Bio Card -->
      <div class="card about-card">
        <!-- Hero Header -->
        <div class="about-hero">
          <div class="avatar-container">
            <div class="avatar-glow"></div>
            <img src="/profile.webp" alt="Kadek Agus Arikusuma Wardana" class="about-avatar" />
          </div>

          <div class="hero-info">
            <h3 class="hero-name">Kadek Agus Arikusuma Wardana</h3>
            <div class="hero-badges">
              <span class="status-badge">
                <span class="status-dot"></span> Available for Work & Project
              </span>
              <span class="location-tag">
                <MapPin :size="13" class="location-icon" /> Denpasar, Bali
              </span>
            </div>
          </div>
        </div>

        <div class="hero-divider"></div>

        <!-- Bio Body -->
        <div class="about-body">
          <h2 class="about-greeting">
            Hello, I'm <span class="text-accent">Arikusuma</span> 
          </h2>

          <p class="about-text">
            I'm an Informatics student at <strong>Primakara University</strong> with a deep passion for full-stack web development and interactive game programming. I enjoy turning complex ideas into clean, functional, and user-friendly digital experiences.
          </p>

          <p class="about-text">
            My technical focus bridges two exciting domains: crafting modern, high-performance web applications using frameworks like <strong>Vue.js</strong> and <strong>Laravel</strong>, and engineering immersive gameplay experiences in <strong>Unity</strong> using <strong>C#</strong>.
          </p>

          <!-- Highlight Badges Grid -->
          <div class="highlights-grid">
            <div class="highlight-card">
              <div class="hl-icon"><Code :size="18" /></div>
              <span>Full-Stack Web</span>
            </div>
            <div class="highlight-card">
              <div class="hl-icon"><Gamepad2 :size="18" /></div>
              <span>Unity Game Dev</span>
            </div>
            <div class="highlight-card">
              <div class="hl-icon"><Rocket :size="18" /></div>
              <span>Agile Teamwork</span>
            </div>
            <div class="highlight-card">
              <div class="hl-icon"><Heart :size="18" /></div>
              <span>Continuous Learning</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Education & Core Competencies Grid -->
      <div class="about-sections-grid grid grid-2">
        <div class="card info-block">
          <div class="info-block-header">
            <div class="icon-circle">
              <GraduationCap :size="20" />
            </div>
            <h3>Education</h3>
          </div>
          <div class="info-block-content">
            <h4>S1 Informatics / Computer Science</h4>
            <p class="institution">Primakara University</p>
            <p class="info-desc">
              Focusing on software engineering principles, algorithm optimization, database management, and modern application development.
            </p>
          </div>
        </div>

        <div class="card info-block">
          <div class="info-block-header">
            <div class="icon-circle">
              <Sparkles :size="20" />
            </div>
            <h3>Core Competencies</h3>
          </div>
          <div class="info-block-content">
            <ul class="competencies-list">
              <li><span>Clean Code & Component Architecture</span></li>
              <li><span>Responsive Web & UI/UX Design</span></li>
              <li><span>Game Physics, State & Gameplay Mechanics</span></li>
              <li><span>Git Version Control & Team Collaboration</span></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- CTA Banner -->
      <div class="card about-cta-banner">
        <div class="cta-content">
          <h3>Interested in collaborating?</h3>
          <p>Feel free to reach out or explore my project portfolio.</p>
        </div>
        <router-link to="/projects" class="btn btn-primary cta-btn">
          View My Projects <ArrowRight :size="18" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowRight, Code, Gamepad2, GraduationCap, Heart, MapPin, Rocket, Sparkles } from 'lucide-vue-next'
import { useHead } from '@unhead/vue'
import { seoConfig } from '../config/seo'

useHead({
  title: 'About',
  meta: [
    {
      name: 'description',
      content: `Learn more about ${seoConfig.fullName} (${seoConfig.displayName} / ${seoConfig.nickName}). Discover my background, university study, and professional interests.`
    },
    {
      name: 'keywords',
      content: `About ${seoConfig.fullName}, About ${seoConfig.displayName}, ${seoConfig.nickName}, bio, developer profile, Primakara University`
    },
    {
      property: 'og:title',
      content: `About | ${seoConfig.displayName}`
    },
    {
      property: 'og:description',
      content: `Learn more about ${seoConfig.fullName} (${seoConfig.displayName} / ${seoConfig.nickName}), Web Developer and Game Developer.`
    },
    {
      name: 'twitter:title',
      content: `About | ${seoConfig.displayName}`
    },
    {
      name: 'twitter:description',
      content: `Learn more about ${seoConfig.fullName} (${seoConfig.displayName} / ${seoConfig.nickName}), Web Developer and Game Developer.`
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": `${seoConfig.siteUrl}/about/#webpage`,
        "url": `${seoConfig.siteUrl}/about`,
        "name": `About ${seoConfig.displayName}`,
        "description": `Learn more about ${seoConfig.fullName} (${seoConfig.displayName} / ${seoConfig.nickName}), Web Developer and Game Developer.`,
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
</script>

<style scoped>
.about-page {
  padding-top: calc(70px + var(--space-4));
  padding-bottom: var(--space-5);
  padding-left: var(--space-3);
  padding-right: var(--space-3);
  justify-content: flex-start;
  width: 100%;
}

.about-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  width: 100%;
}

/* Hero Bio Card */
.about-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  animation: cardFloat 6s ease-in-out infinite, borderPulse 4s ease-in-out infinite;
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

.about-card:hover {
  border-color: var(--color-accent);
  box-shadow: 0 8px 24px -8px var(--color-accent-muted);
}

/* Hero Header Inside Bio Card */
.about-hero {
  background: transparent;
  padding: var(--space-5);
  display: flex;
  align-items: center;
  gap: var(--space-5);
}

.avatar-container {
  position: relative;
  width: 90px;
  height: 90px;
  min-width: 90px;
  border-radius: 50%;
}

.avatar-glow {
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-accent), transparent 70%);
  opacity: 0.6;
  filter: blur(4px);
}

.about-avatar {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-surface);
}

.hero-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hero-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.3;
}

.hero-badges {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.775rem;
  font-weight: 600;
  color: var(--color-accent-text);
  background: var(--color-accent-muted);
  border: 1px solid rgba(0, 217, 163, 0.3);
  padding: 4px 12px;
  border-radius: var(--radius-full);
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 6px var(--color-accent);
  animation: pulseDot 1.5s ease-in-out infinite;
}

@keyframes pulseDot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.3); }
}

.location-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 4px 10px;
  border-radius: var(--radius-full);
}

.location-icon {
  color: var(--color-accent-text);
}

.hero-divider {
  border-bottom: 1px dashed var(--color-border);
  width: 100%;
}

/* Bio Body */
.about-body {
  padding: var(--space-5);
}

.about-greeting {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: var(--space-3);
  color: var(--color-text-primary);
}

.about-text {
  font-size: 0.95rem;
  line-height: 1.75;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-3);
}

/* Highlight Badges Grid */
.highlights-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px dashed var(--color-border);
}

.highlight-card {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: 0.825rem;
  font-weight: 600;
  color: var(--color-text-primary);
  transition: all var(--duration-fast) var(--ease-standard);
  max-width: 100%;
}

.highlight-card span {
  white-space: nowrap;
}

.highlight-card:hover {
  border-color: var(--color-accent);
  color: var(--color-accent-text);
  background: var(--color-surface);
  transform: translateY(-2px);
}

.hl-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  min-width: 30px;
  border-radius: 50%;
  background: var(--color-accent-muted);
  border: 1px solid rgba(0, 217, 163, 0.3);
  color: var(--color-accent-text);
}

/* Education & Focus Info Blocks */
.info-block {
  padding: var(--space-5);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  animation: cardFloat 6.5s ease-in-out infinite, borderPulse 4s ease-in-out infinite;
  animation-delay: -2s, -1s;
}

.info-block-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--space-3);
}

.icon-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent);
}

.info-block-header h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.info-block-content h4 {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.institution {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-accent-text);
  margin-top: 2px;
  margin-bottom: var(--space-2);
}

.info-desc {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.competencies-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.competencies-list li {
  position: relative;
  padding-left: 20px;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.competencies-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-weight: bold;
}

/* CTA Banner */
.about-cta-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-5);
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  animation: cardFloat 7s ease-in-out infinite, borderPulse 4s ease-in-out infinite;
  animation-delay: -3.5s, -2s;
}

.cta-content h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.cta-content p {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-top: 4px;
}

/* Mobile Responsiveness (< 768px) */
@media (max-width: 768px) {
  .about-page {
    padding-left: var(--space-3);
    padding-right: var(--space-3);
  }

  .about-hero {
    flex-direction: column;
    text-align: center;
    padding: var(--space-4);
    gap: var(--space-3);
  }

  .avatar-container {
    width: 96px;
    height: 96px;
    min-width: 96px;
  }

  .hero-info {
    align-items: center;
    text-align: center;
  }

  .hero-name {
    font-size: 1.2rem;
  }

  .hero-badges {
    justify-content: center;
    gap: 6px;
  }

  .status-badge, .location-tag {
    font-size: 0.75rem;
    padding: 4px 10px;
  }

  .about-body {
    padding: var(--space-4);
  }

  .about-greeting {
    font-size: 1.35rem;
    text-align: center;
  }

  .about-text {
    font-size: 0.9rem;
    line-height: 1.7;
  }

  .highlights-grid {
    gap: 8px;
    justify-content: center;
  }

  .highlight-card {
    padding: 6px 12px;
    font-size: 0.775rem;
    gap: 8px;
  }

  .hl-icon {
    width: 26px;
    height: 26px;
    min-width: 26px;
  }

  .about-cta-banner {
    flex-direction: column;
    text-align: center;
    gap: var(--space-3);
    padding: var(--space-4);
  }

  .cta-btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .about-page {
    padding-left: 12px;
    padding-right: 12px;
  }

  .hero-name {
    font-size: 1.1rem;
  }

  .about-greeting {
    font-size: 1.25rem;
  }

  .highlight-card {
    font-size: 0.75rem;
    padding: 5px 10px;
  }
}
</style>
