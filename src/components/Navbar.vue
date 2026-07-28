<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="navbar-brand">
        <img src="/logo.svg?v=2" alt="Arikusuma Wardana Logo" class="brand-logo" />
        <span class="brand-text">Arikusuma<span class="text-accent">.</span></span>
      </router-link>

      <!-- Right Actions Bar for Mobile (Theme Toggle + Hamburger) -->
      <div class="mobile-actions">
        <button
          class="theme-toggle icon-btn header-theme-toggle"
          @click="toggleTheme"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          aria-label="Toggle Theme"
        >
          <Moon v-if="!isDark" :size="18" />
          <Sun v-else :size="18" />
        </button>

        <button
          class="hamburger"
          :class="{ active: isMenuOpen }"
          @click="toggleMenu"
          aria-label="Toggle Navigation Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <!-- Navigation Drawer / Menu -->
      <div class="navbar-menu" :class="{ active: isMenuOpen }">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="nav-link"
          :class="{ active: $route.path === link.path }"
          @click="closeMenu"
        >
          <component :is="link.icon" :size="18" />
          <span>{{ link.name }}</span>
        </router-link>

        <!-- Full-width Theme Switcher Item inside Mobile Drawer -->
        <button class="nav-link mobile-theme-item" @click="toggleTheme">
          <Moon v-if="!isDark" :size="18" />
          <Sun v-else :size="18" />
          <span>Switch to {{ isDark ? 'Light' : 'Dark' }} Mode</span>
        </button>

        <!-- Desktop Theme Toggle -->
        <button
          class="theme-toggle icon-btn desktop-theme-toggle"
          @click="toggleTheme"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          aria-label="Toggle Theme"
        >
          <Moon v-if="!isDark" :size="20" />
          <Sun v-else :size="20" />
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { BriefcaseBusiness, FolderKanban, HeartHandshake, Home, Moon, Sun, User, Wrench, Zap } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'

const isMenuOpen = ref(false)
const isDark = ref(false)

const navLinks = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'About', path: '/about', icon: User },
  { name: 'Tech Stack', path: '/tech-stack', icon: Zap },
  { name: 'Tools', path: '/tools', icon: Wrench },
  { name: 'Projects', path: '/projects', icon: FolderKanban },
  { name: 'Experiences', path: '/experiences', icon: BriefcaseBusiness },
  { name: 'Volunteers', path: '/volunteers', icon: HeartHandshake }
]

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.documentElement.setAttribute('data-theme', 'dark')
  } else if (savedTheme === 'light') {
    isDark.value = false
    document.documentElement.setAttribute('data-theme', 'light')
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = prefersDark
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
  }
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  z-index: var(--z-navbar);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.navbar-container {
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 var(--space-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: var(--color-text-primary);
  text-decoration: none;
}

.brand-logo {
  width: 38px;
  height: 38px;
}

.mobile-actions {
  display: none;
  align-items: center;
  gap: var(--space-3);
}

.navbar-menu {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  font-weight: 500;
  font-size: 0.875rem;
  transition: all var(--duration-fast) var(--ease-standard);
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
}

.nav-link:hover {
  color: var(--color-text-primary);
  background: var(--color-surface-raised);
  border-color: var(--color-border);
}

.nav-link.active {
  color: var(--color-accent-text);
  background: var(--color-accent-muted);
  border-color: transparent;
  font-weight: 600;
}

.desktop-theme-toggle {
  margin-left: var(--space-2);
}

.mobile-theme-item {
  display: none;
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--color-text-primary);
  border-radius: 2px;
  transition: all var(--duration-fast) var(--ease-standard);
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Mobile Responsive (< 768px) */
@media (max-width: 768px) {
  .mobile-actions {
    display: flex;
  }

  .header-theme-toggle {
    width: 36px;
    height: 36px;
  }

  .hamburger {
    display: flex;
    z-index: 10;
  }

  .desktop-theme-toggle {
    display: none;
  }

  .mobile-theme-item {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: var(--space-2);
    padding: var(--space-3);
    font-size: 0.95rem;
    border: 1px solid var(--color-border);
    background: var(--color-surface-raised);
    color: var(--color-accent-text);
  }

  .navbar-menu {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    height: calc(100vh - 70px);
    min-height: calc(100vh - 70px);
    flex-direction: column;
    justify-content: flex-start;
    padding: var(--space-4);
    background: var(--color-surface);
    border-top: 1px solid var(--color-border);
    opacity: 0;
    visibility: hidden;
    transition: all var(--duration-fast) var(--ease-standard);
    z-index: 99;
    overflow-y: auto;
    gap: var(--space-2);
  }

  .navbar-menu.active {
    opacity: 1;
    visibility: visible;
  }

  .nav-link {
    width: 100%;
    justify-content: center;
    padding: var(--space-3);
    font-size: 1rem;
  }
}
</style>
