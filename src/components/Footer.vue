<template>
  <footer class="footer glass">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-brand">
          <img src="/logo.svg" alt="AW Logo" class="brand-logo" />
          <span>Portfolio</span>
        </div>
        <p class="footer-tagline">Crafting digital experiences with passion and precision.</p>
      </div>

      <div class="footer-social">
        <a href="https://instagram.com/arikusuma.05" target="_blank" rel="noopener" class="social-link">
          <Instagram :size="20" />
        </a>
        <a href="https://github.com/ArikusumaWardana" target="_blank" rel="noopener" class="social-link">
          <Github :size="20" />
        </a>
        <a href="https://www.linkedin.com/in/arikusuma-wardana/" target="_blank" rel="noopener" class="social-link">
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
  padding: var(--space-xl) 0;
  border-top: 1px solid var(--border-color);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
}

.footer-content {
  text-align: center;
}

.footer-brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}

.brand-logo {
  width: 28px;
  height: 28px;
  border-radius: 6px;
}

.footer-tagline {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.footer-social {
  display: flex;
  gap: var(--space-md);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: var(--radius-full);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  transition: all var(--transition-normal);
}

.social-link:hover {
  background: var(--gradient-primary);
  color: white;
  border-color: transparent;
  transform: translateY(-3px);
  box-shadow: var(--shadow-glow);
}

.footer-bottom {
  text-align: center;
  padding-top: var(--space-md);
  border-top: 1px solid var(--border-color);
  width: 100%;
}

.footer-bottom p {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.heart {
  color: #e74c3c;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

@media (max-width: 768px) {
  .footer-container {
    gap: var(--space-md);
  }
}
</style>
