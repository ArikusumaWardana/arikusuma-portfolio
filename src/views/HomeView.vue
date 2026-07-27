<template>
  <div class="page home-page">
    <div class="home-container animate-fadeIn">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-container">
          <div class="hero-content">
            <div class="status-pill">
              <span class="status-dot"></span>
              <span>Available for Web & Game Projects</span>
            </div>

            <h1 class="home-name">
              Arikusuma Wardana<span class="name-accent">.</span>
            </h1>

            <div class="role-badges">
              <span class="role-badge"><Code :size="15" /> Web Developer</span>
              <span class="role-badge"><Gamepad2 :size="15" /> Game Programmer</span>
              <span class="role-badge"><GraduationCap :size="15" /> Primakara Univ</span>
            </div>

            <p class="home-quote">
              Crafting high-performance web applications and immersive game experiences with precision, clean architecture, and solid logic.
            </p>

            <div class="hero-actions">
              <router-link to="/projects" class="btn btn-primary">
                Explore Projects <ArrowRight :size="18" />
              </router-link>
              <router-link to="/about" class="btn btn-ghost">
                About Me <User :size="18" />
              </router-link>
            </div>

            <div class="social-links">
              <SocialIcon
                name="Instagram"
                link="https://instagram.com/arikusuma.05"
                :icon="Instagram"
              />
              <SocialIcon
                name="GitHub"
                link="https://github.com/ArikusumaWardana"
                :icon="Github"
              />
              <SocialIcon
                name="LinkedIn"
                link="https://www.linkedin.com/in/arikusuma-wardana/"
                :icon="Linkedin"
              />
              <SocialIcon
                name="Email"
                link="mailto:arikusumawardana09@gmail.com"
                :icon="Mail"
              />
              <SocialIcon
                name="WhatsApp"
                link="https://wa.me/6285339307788"
                :icon="MessageCircle"
              />
            </div>
          </div>

          <div class="hero-visual">
            <div class="profile-card">
              <div class="profile-frame">
                <img src="/profile.webp" alt="Arikusuma Wardana Profile Photo" class="profile-img" />
              </div>
              <div class="floating-tag tag-top">
                <Sparkles :size="16" class="tag-icon" />
                <span>Vue.js & Unity</span>
              </div>
              <div class="floating-tag tag-bottom">
                <Briefcase :size="16" class="tag-icon" />
                <span>Full-Stack & Game</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Highlight Strip -->
      <section class="stats-section">
        <div class="stats-grid grid grid-4">
          <div class="stat-box card">
            <span class="stat-num text-accent">3+</span>
            <span class="stat-text">Years Coding Experience</span>
          </div>
          <div class="stat-box card">
            <span class="stat-num text-accent">10+</span>
            <span class="stat-text">Projects Portfolio</span>
          </div>
          <div class="stat-box card">
            <span class="stat-num text-accent">2</span>
            <span class="stat-text">Core Specializations</span>
          </div>
          <div class="stat-box card">
            <span class="stat-num text-accent">100%</span>
            <span class="stat-text">Clean Code Focus</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import {
  ArrowRight,
  Briefcase,
  Code,
  Gamepad2,
  Github,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Sparkles,
  User
} from 'lucide-vue-next';
import SocialIcon from '../components/SocialIcon.vue';
import { useHead } from '@unhead/vue';
import { seoConfig } from '../config/seo';

useHead({
  title: '',
  meta: [
    {
      name: 'description',
      content: seoConfig.defaultDescription
    },
    {
      name: 'keywords',
      content: seoConfig.defaultKeywords
    },
    {
      property: 'og:title',
      content: seoConfig.defaultTitle
    },
    {
      property: 'og:description',
      content: seoConfig.defaultDescription
    },
    {
      property: 'og:url',
      content: seoConfig.siteUrl
    },
    {
      name: 'twitter:title',
      content: seoConfig.defaultTitle
    },
    {
      name: 'twitter:description',
      content: seoConfig.defaultDescription
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Person",
            "@id": `${seoConfig.siteUrl}/#person`,
            "name": seoConfig.fullName,
            "additionalName": seoConfig.nickName,
            "alternateName": seoConfig.displayName,
            "jobTitle": "Web Developer & Game Developer",
            "url": seoConfig.siteUrl,
            "image": `${seoConfig.siteUrl}/profile.webp`,
            "sameAs": [
              seoConfig.socialLinks.github,
              seoConfig.socialLinks.linkedin,
              seoConfig.socialLinks.instagram
            ],
            "knowsAbout": ["Web Development", "Game Development", "Vue.js", "Vite", "C#", "Unity"]
          },
          {
            "@type": "WebSite",
            "@id": `${seoConfig.siteUrl}/#website`,
            "url": seoConfig.siteUrl,
            "name": seoConfig.displayName,
            "publisher": {
              "@id": `${seoConfig.siteUrl}/#person`
            },
            "description": seoConfig.defaultDescription
          }
        ]
      })
    }
  ]
})
</script>

<style scoped>
.home-page {
  padding-top: calc(70px + var(--space-5));
  padding-bottom: var(--space-6);
  width: 100%;
}

.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* Hero Section */
.hero-section {
  padding: var(--space-4) 0;
}

.hero-container {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  align-items: center;
  gap: var(--space-6);
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-3);
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 6px 14px;
  background: var(--color-accent-muted);
  border: 1px solid var(--color-accent);
  border-radius: var(--radius-full);
  font-size: 0.825rem;
  font-weight: 600;
  color: var(--color-accent-text);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-accent);
}

.home-name {
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  font-weight: 800;
  line-height: 1.1;
  color: var(--color-text-primary);
}

.name-accent {
  color: var(--color-accent-text);
}

.role-badges {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.role-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.role-badge svg {
  color: var(--color-accent-text);
}

.home-quote {
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  max-width: 520px;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.social-links {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-card {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-frame {
  width: 240px;
  height: 240px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  padding: 8px;
  background: var(--color-surface);
  box-shadow: var(--shadow-lg);
}

.profile-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.floating-tag {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-primary);
  box-shadow: var(--shadow-md);
  white-space: nowrap;
}

.floating-tag .tag-icon {
  color: var(--color-accent-text);
}

.tag-top {
  top: 10px;
  right: -20px;
}

.tag-bottom {
  bottom: 10px;
  left: -20px;
}

/* Stats Section */
.stats-grid {
  gap: var(--space-4);
}

.stat-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--duration-fast) var(--ease-standard);
}

.stat-box:hover {
  transform: translateY(-3px);
  border-color: var(--color-accent);
}

.stat-num {
  font-size: 2.25rem;
  font-weight: 800;
  font-family: var(--font-display);
}

.stat-text {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-top: 4px;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-content {
    align-items: center;
  }

  .hero-actions {
    justify-content: center;
  }

  .tag-top {
    right: 0;
  }

  .tag-bottom {
    left: 0;
  }
}
</style>
