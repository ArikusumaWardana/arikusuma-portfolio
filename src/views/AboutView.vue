<template>
  <div class="page about-page">
    <div class="about-content animate-fadeIn">
      <div class="page-title">
        <h2>About <span class="text-accent">Me</span></h2>
        <p>Get to know my background, expertise, and passion</p>
      </div>

      <!-- Main Profile Bio Card -->
      <div class="about-card glass-card">
        <div class="about-header">
          <div class="about-avatar-wrapper">
            <img src="/profile.webp" alt="Arikusuma Wardana" class="about-avatar" />
            <div class="about-header-info">
              <h3 class="about-header-name">Kadek Agus Arikusuma Wardana</h3>
              <span class="status-badge">
                <span class="status-dot"></span> Available for Work & Projects
              </span>
              <span class="location-tag">
                <MapPin :size="14" class="location-icon" /> Denpasar, Bali, Indonesia
              </span>
            </div>
          </div>
        </div>

        <div class="about-body">
          <h2>Hello, I'm <span class="text-accent">Arikusuma Wardana</span></h2>

          <p>
            I'm an Informatics student at <strong>Primakara University</strong> with a deep passion for full-stack web development and interactive game programming. I enjoy turning complex ideas into clean, functional, and user-friendly digital experiences.
          </p>

          <p>
            My technical focus bridges two exciting domains: crafting modern, high-performance web applications using frameworks like Vue.js and Laravel, and engineering immersive 2D/3D gameplay experiences in Unity using C#. I strive for clean architecture, scalable code, and intuitive visual presentation in every project.
          </p>

          <div class="about-highlights">
            <div class="highlight-item">
              <Code :size="18" />
              <span>Full-Stack Web</span>
            </div>
            <div class="highlight-item">
              <Gamepad2 :size="18" />
              <span>Unity Game Dev</span>
            </div>
            <div class="highlight-item">
              <Rocket :size="18" />
              <span>Agile Teamwork</span>
            </div>
            <div class="highlight-item">
              <Heart :size="18" />
              <span>Continuous Learning</span>
            </div>
          </div>
        </div>
      </div>



      <!-- Education & Focus Grid -->
      <div class="about-sections-grid grid grid-2">
        <div class="info-block card">
          <div class="info-block-header">
            <GraduationCap :size="24" class="info-icon" />
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

        <div class="info-block card">
          <div class="info-block-header">
            <Sparkles :size="24" class="info-icon" />
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

      <!-- Quick CTA Banner -->
      <div class="about-cta-banner card">
        <div class="cta-content">
          <h3>Interested in collaborating?</h3>
          <p>Feel free to reach out or explore my project portfolio.</p>
        </div>
        <router-link to="/projects" class="btn btn-primary">
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
  padding-top: calc(70px + var(--space-5));
  padding-bottom: var(--space-6);
}

.about-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.about-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.about-header {
  background: var(--color-surface-raised);
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-4) var(--space-5);
}

.about-avatar-wrapper {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.about-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.about-header-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
}

.about-header-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-accent-text);
  background: var(--color-accent-muted);
  padding: 4px 10px;
  border-radius: var(--radius-full);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-accent);
  display: inline-block;
}

.location-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.location-icon {
  color: var(--color-accent-text);
}

.about-body {
  padding: var(--space-5);
}

.about-body h2 {
  font-size: 1.75rem;
  margin-bottom: var(--space-3);
  color: var(--color-text-primary);
}

.about-body p {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-3);
}

.about-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-4);
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 8px 16px;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-primary);
  transition: all var(--duration-fast) var(--ease-standard);
}

.highlight-item:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.highlight-item svg {
  color: var(--color-accent);
}


/* Education & Focus Info Blocks */
.info-block {
  padding: var(--space-5);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.info-block-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);

  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--space-3);
}

.info-block-header h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.info-icon {
  color: var(--color-accent-text);
}

.info-block-content h4 {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.institution {
  font-size: 0.9rem;
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
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.competencies-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-accent-text);
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
  box-shadow: var(--shadow-sm);
}

.cta-content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.cta-content p {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-top: 4px;
}

@media (max-width: 768px) {
  .about-cta-banner {
    flex-direction: column;
    text-align: center;
  }

  .about-avatar-wrapper {
    flex-direction: column;
    text-align: center;
  }

  .about-header-info {
    align-items: center;
  }
}

@media (max-width: 480px) {
  .about-body {
    padding: var(--space-4);
  }

  .about-highlights {
    justify-content: center;
  }
}
</style>
