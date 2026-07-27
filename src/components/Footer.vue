<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-brand">
          <img src="/logo.svg?v=2" alt="Arikusuma Wardana Logo" loading="lazy" class="brand-logo" />
          <span>Portfolio</span>
        </div>
        <p class="footer-tagline">Crafting digital experiences with passion and precision.</p>
      </div>

      <div class="footer-social">
        <a href="https://instagram.com/arikusuma.05" target="_blank" rel="noopener noreferrer" class="social-link" title="Instagram">
          <Instagram :size="20" />
        </a>
        <a href="https://github.com/ArikusumaWardana" target="_blank" rel="noopener noreferrer" class="social-link" title="GitHub">
          <Github :size="20" />
        </a>
        <a href="https://www.linkedin.com/in/arikusuma-wardana/" target="_blank" rel="noopener noreferrer" class="social-link" title="LinkedIn">
          <Linkedin :size="20" />
        </a>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Arikusuma Wardana. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { Instagram, Github, Linkedin } from 'lucide-vue-next'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  margin-top: auto;
  padding: var(--space-5) 0 var(--space-4);
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-4);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.footer-content {
  text-align: center;
}

.footer-brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.brand-logo {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
}

.footer-tagline {
  font-size: 0.9rem;
  color: var(--color-text-tertiary);
}

.footer-social {
  display: flex;
  gap: var(--space-3);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  transition: all var(--duration-fast) var(--ease-standard);
}

.social-link:hover {
  background: var(--color-surface);
  color: var(--color-accent);
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.footer-bottom {
  text-align: center;
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-border);
  width: 100%;
}

.footer-bottom p {
  font-size: 0.85rem;
  color: var(--color-text-tertiary);
}

@media (max-width: 768px) {
  .footer-container {
    gap: var(--space-3);
  }
}
</style>
