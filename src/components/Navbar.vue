<template>
  <nav class="navbar glass">
    <div class="navbar-container">
      <router-link to="/" class="navbar-brand">
        <img src="/logo.svg" alt="AW Logo" class="brand-logo" />
        <span class="brand-text">Portfolio</span>
      </router-link>

      <button class="hamburger" :class="{ active: isMenuOpen }" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>

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

        <button class="theme-toggle icon-btn" @click="toggleTheme" :title="isDark ? 'Light Mode' : 'Dark Mode'">
          <Moon v-if="!isDark" :size="20" />
          <Sun v-else :size="20" />
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { BriefcaseBusiness, FolderKanban, Home, Moon, Sun, User, Wrench, Zap } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'

const isMenuOpen = ref(false)
const isDark = ref(false)

const navLinks = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'About', path: '/about', icon: User },
  { name: 'Skill', path: '/skill', icon: Zap },
  { name: 'Tools', path: '/tools', icon: Wrench },
  { name: 'Projects', path: '/projects', icon: FolderKanban },
  { name: 'Experiences', path: '/experiences', icon: BriefcaseBusiness }
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
    // Check system preference
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
  border-bottom: 1px solid var(--border-color);
}

.navbar-container {
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 var(--space-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
}

.brand-logo {
  width: 36px;
  height: 36px;
  border-radius: 8px;
}

.navbar-menu {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.9rem;
  transition: all var(--transition-normal);
}

.nav-link:hover {
  color: var(--text-primary);
  background: var(--bg-card);
}

.nav-link.active {
  color: white;
  background: var(--gradient-primary);
}

.theme-toggle {
  margin-left: var(--space-sm);
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
  background: var(--text-primary);
  border-radius: 2px;
  transition: all var(--transition-normal);
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

@media (max-width: 768px) {
  .hamburger {
    display: flex;
    z-index: 10;
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
    padding: var(--space-xl);
    background: var(--bg-primary);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid var(--border-color);
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-normal);
    z-index: 99;
    overflow-y: auto;
  }

  .navbar-menu.active {
    opacity: 1;
    visibility: visible;
  }

  .nav-link {
    width: 100%;
    justify-content: center;
    padding: var(--space-md) var(--space-lg);
    font-size: 1.1rem;
  }

  .theme-toggle {
    margin-left: 0;
    margin-top: var(--space-md);
  }
}
</style>
