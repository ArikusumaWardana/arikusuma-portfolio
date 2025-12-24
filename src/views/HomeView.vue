<template>
  <div class="page home-page">
    <div class="home-content animate-fadeIn">
      <div class="profile-photo animate-float">
        <img src="/profile.png" alt="Profile Photo" />
      </div>

      <h1 class="home-name">
        <span class="gradient-text">Arikusuma Wardana</span>
      </h1>

      <p class="home-tagline">
        Web Developer & Game Programmer
      </p>

      <p class="home-quote">
        "Transforming ideas into beautiful digital experiences"
      </p>

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
      </div>

      <div class="scroll-indicator">
        <ChevronDown :size="24" class="bounce" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronDown, Github, Instagram, Linkedin } from 'lucide-vue-next';
import SocialIcon from '../components/SocialIcon.vue';
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 70px;
}

.home-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-lg);
  max-width: 600px;
}

.profile-photo {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  padding: 4px;
  background: var(--gradient-primary);
  box-shadow: var(--shadow-glow);
}

.profile-photo img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background: var(--bg-secondary);
}

.home-name {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
}

.home-tagline {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.home-quote {
  font-size: 1rem;
  font-style: italic;
  color: var(--text-muted);
  max-width: 400px;
}

.social-links {
  display: flex;
  gap: var(--space-md);
  margin-top: var(--space-md);
}

.scroll-indicator {
  position: absolute;
  bottom: var(--space-2xl);
  color: var(--text-muted);
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(10px);
  }
  60% {
    transform: translateY(5px);
  }
}

@media (max-width: 480px) {
  .profile-photo {
    width: 140px;
    height: 140px;
  }

  .home-tagline {
    font-size: 1.1rem;
  }
}
</style>
