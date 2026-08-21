<template>
  <div class="page projects-page">
    <div class="projects-content animate-fadeIn">
      <div class="page-title">
        <h2>My <span class="text-accent">Projects</span></h2>
        <p>Some of my recent work and side projects</p>
      </div>

      <!-- Category Filter -->
      <div class="filter-container">
        <button
          v-for="cat in filterCategories"
          :key="cat"
          class="filter-btn glass"
          :class="{ active: activeFilter === cat }"
          @click="setFilter(cat)"
        >
          {{ cat }}
        </button>
      </div>

      <div class="projects-grid grid grid-3" :key="activeFilter + '-' + currentPage">
        <ProjectCard
          v-for="(project, index) in paginatedProjects"
          :key="project.name"
          :name="project.name"
          :description="project.description"
          :image="project.image"
          :techStack="project.techStack"
          :websiteUrl="project.websiteUrl"
          :githubUrl="project.githubUrl"
          :class="`delay-${(index + 1) * 100}`"
          class="animate-fadeIn"
        />
      </div>

      <!-- Pagination Controls -->
      <div class="pagination-container" v-if="totalPages > 1">
        <button
          class="pagination-btn arrow-btn glass"
          :disabled="currentPage === 1"
          @click="setPage(currentPage - 1)"
          aria-label="Previous Page"
        >
          <ChevronLeft :size="20" />
        </button>

        <div class="pagination-numbers">
          <button
            v-for="page in totalPages"
            :key="page"
            class="pagination-btn num-btn glass"
            :class="{ active: currentPage === page }"
            @click="setPage(page)"
          >
            {{ page }}
          </button>
        </div>

        <button
          class="pagination-btn arrow-btn glass"
          :disabled="currentPage === totalPages"
          @click="setPage(currentPage + 1)"
          aria-label="Next Page"
        >
          <ChevronRight :size="20" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import ProjectCard from '../components/ProjectCard.vue';
import { useHead } from '@unhead/vue';
import { seoConfig } from '../config/seo';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

useHead({
  title: 'Projects',
  meta: [
    {
      name: 'description',
      content: `Explore creative web applications and Unity game projects developed by ${seoConfig.fullName} (${seoConfig.displayName}).`
    },
    {
      name: 'keywords',
      content: `projects, portfolio, web apps, games, Unity, Laravel, Vue.js, C#, ${seoConfig.displayName}, ${seoConfig.fullName}`
    },
    // Open Graph
    {
      property: 'og:title',
      content: `Projects | ${seoConfig.displayName}`
    },
    {
      property: 'og:description',
      content: `Explore creative web applications and Unity game projects developed by ${seoConfig.fullName} (${seoConfig.displayName}).`
    },
    // Twitter Cards
    {
      name: 'twitter:title',
      content: `Projects | ${seoConfig.displayName}`
    },
    {
      name: 'twitter:description',
      content: `Explore creative web applications and Unity game projects developed by ${seoConfig.fullName} (${seoConfig.displayName}).`
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${seoConfig.siteUrl}/projects/#webpage`,
        "url": `${seoConfig.siteUrl}/projects`,
        "name": `Projects by ${seoConfig.displayName}`,
        "description": `Explore web applications and game projects developed by ${seoConfig.fullName}.`,
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

const projects = [
  {
    name: 'Kwitansi Website',
    description: 'A streamlined web application for creating and generating simple receipts with PDF export functionality.',
    image: '/projects/kwitansi.webp',
    techStack: ['HTML', 'CSS', 'Bootstrap', 'PHP', 'mPDF'],
    githubUrl: 'https://github.com/ArikusumaWardana/form-kwitansi',
    category: 'Website'
  },
  {
    name: 'Buku Explore Website',
    description: 'An e-commerce platform for browsing and purchasing books with a clean and user-friendly interface.',
    image: '/projects/buku-explore.webp',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Laravel'],
    githubUrl: 'https://github.com/ArikusumaWardana/BukuExplore-Website',
    category: 'Website'
  },
  {
    name: 'Primdev Blog',
    description: 'A modern blog platform that fetches and displays content dynamically from an external API.',
    image: '/projects/primdev-blog.webp',
    techStack: ['Vue.js', 'Tailwind CSS', 'API', 'Vercel'],
    websiteUrl: 'https://primdev-blog.vercel.app/',
    githubUrl: 'https://github.com/ArikusumaWardana/primdev-blog',
    category: 'Website'
  },
  {
    name: 'Refill Universe Website',
    description: 'A community website built for the Morning 2 Informatics class of Primakara University to share resources and connect.',
    image: '/projects/reffill-universe.webp',
    techStack: ['Vue.js', 'Tailwind CSS', 'Vercel'],
    websiteUrl: 'https://refill-universe.vercel.app/',
    githubUrl: 'https://github.com/ArikusumaWardana/refill-universe',
    category: 'Website'
  },
  {
    name: 'Clock Website',
    description: 'A minimalist digital clock application displaying the current day, date, month, and time in real-time.',
    image: '/projects/clock.webp',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    websiteUrl: 'https://arikusumawardana.github.io/Clock/',
    githubUrl: 'https://github.com/ArikusumaWardana/Clock',
    category: 'Website'
  },
  {
    name: 'Novels Up Website',
    description: 'A reading platform designed for light novel and web novel enthusiasts to discover and read various stories.',
    image: '/projects/novels-up.webp',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Laravel'],
    githubUrl: 'https://github.com/ArikusumaWardana/Novels-Up',
    category: 'Website'
  },
  {
    name: 'ScxLyrics Website',
    description: 'A lyrics discovery platform that allows users to search and view song lyrics from various artists.',
    image: '/projects/scxlyrics.webp',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'PHP'],
    githubUrl: 'https://github.com/ArikusumaWardana/scxlyrics',
    category: 'Website'
  },
  {
    name: 'Movieque Website',
    description: 'A movie discovery application that displays detailed information about films, including ratings, synopsis, and cast.',
    image: '/projects/movieque.webp',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'API', 'Vercel'],
    websiteUrl: 'https://movieque-tau.vercel.app/',
    githubUrl: 'https://github.com/ArikusumaWardana/movieque',
    category: 'Website'
  },
  {
    name: 'Tisgumi Website',
    description: 'A professional business landing page for Tisgumi, featuring an integrated point-of-sale cashier system.',
    image: '/projects/tisgumi.webp',
    techStack: ['TypeScript', 'Next.js', 'Prisma', 'Supabase', 'Vercel'],
    websiteUrl: 'https://tisgumi.vercel.app/',
    githubUrl: 'https://github.com/ArikusumaWardana/tisgumi-website',
    category: 'Website'
  },
  {
    name: 'Sentiment Analyst MLBB Reviews',
    description: 'A machine learning pipeline for performing sentiment analysis on Indonesian Mobile Legends game reviews.',
    image: '/projects/taskapp.svg',
    techStack: ['Python', 'IPYNB', 'NLP'],
    githubUrl: 'https://github.com/ArikusumaWardana/Sentiment-Analysis-MLBB',
    category: 'Machine Learning'
  },
  {
    name: 'Midnight Toys',
    description: 'A tense 1980s survival horror game where you manage CCTV, flashlights, security shutters, and fear levels to contain rogue adaptive living doll prototypes. Developed as a competition entry for GIMERSIA.',
    image: '/projects/midnight-toys.webp',
    techStack: ['Unity', 'C#', 'Plastic SCM'],
    websiteUrl: 'https://palm-gamestudio.itch.io/midnight-toys',
    category: 'Game'
  },
  {
    name: 'Animatronics Afterhouse',
    description: 'A horror game project inspired by Five Nights at Freddy\'s 2, featuring immersive gameplay using real-life photo and video assets.',
    image: '/projects/animatronics afterhouse.webp',
    techStack: ['Unity', 'C#', 'Plastic CSM'],
    websiteUrl: 'https://gamejolt.com/games/animatronic_afterhours/1057914',
    category: 'Game'
  },
  {
    name: "Face Emotion Recognition Densenet",
    description: "An end-to-end Face Emotion Recognition (FER) system built with TensorFlow and Transfer Learning (DenseNet121), includes deployment-ready models in SavedModel, TF-Lite (Android), and TFJS (Web) formats.",
    image:'/projects/taskapp.svg',
    techStack: ['Python', 'DenseNet121', 'TensorFlow', 'IPYNB'],
    githubUrl: 'https://github.com/ArikusumaWardana/face-emotion-recognition-densenet',
    category: 'Machine Learning'
  },
  {
    name: 'Vital Fizz Landing Page',
    description: "VITAL FIZZ is a landing page website introducing carbonated herbal drinks that combine Indonesian spices with today's lifestyle.",
    techStack: ['Vue JS', 'Tailwind CSS'],
    image: '/projects/vitalfizz.webp',
    websiteUrl: 'https://vitalfizz.vercel.app/',
    githubUrl: 'https://github.com/ArikusumaWardana/Vital-Fizz',
    category: 'Website'
  },
  {
    name: 'Apsara Essence Website',
    description: 'Apsara Essence is born from the richness of Indonesian spices that have been used for centuries in natural healing traditions. We blend local wisdom with modern research to create truly functional aromatherapy.',
    techStack: ['Vue JS', 'Tailwind CSS'],
    image: '/projects/apsara-essence.webp',
    websiteUrl: 'https://apsara-essence.vercel.app/',
    githubUrl: 'https://github.com/ArikusumaWardana/Apsara-Essence',
    category: 'Website'
  },
  {
    name: 'Paw Splash',
    description: 'Step into the paws of an orange cat and survive an all-out water balloon battle against mischievous rival cats in this auto-deflection survival game. Developed for Gameseed 2026.',
    techStack: ['Unity', 'C#'],
    image: '/projects/paw-splash.webp',
    websiteUrl: 'https://palm-gamestudio.itch.io/pawsplash',
    category: 'Game'
  },
  {
    name: 'EcoChain Website',
    description: "EcoChain is a transparent green supply chain platform connecting eco-conscious producers, consumers, and independent verifiers. Consumers can browse certified sustainable products while tracing each item's origin, carbon footprint, and verification status. Producers can register products to reach a wider eco-conscious market.",
    techStack: ['HTML', 'CSS', 'Javascript'],
    image: '/projects/ecochain.webp',
    githubUrl: 'https://github.com/ArikusumaWardana/EcoChain-website',
    category: 'Website'
  }, 
  {
    name: 'SIGAP Website',
    description: "SIGAP is a web platform that tracks the distribution of social assistance and public funds (bansos, CSR, village funds, scholarships) from the source to the end recipient, with every critical point recorded immutably on the blockchain. This platform is not just a reporting dashboard, but a multi-layered verification system involving the recipient community as digital witnesses, ensuring that the data displayed publicly is truly accountable and not just claimed.",
    techStack: ['Next.JS', 'Supabase', 'Blockchain'],
    image: "/projects/sigap.webp",
    category: 'Website'
  },
  {
    name: 'Verso',
    description: 'Verso is a personal archive for storing web articles and PDF papers. Articles are formatted for easy reading, PDFs are stored alongside the extracted text, and the entire collection is searchable via a PostgreSQL full-text search.',
    techStack: ['Next.JS', 'Supabase', 'PostgreSQL', 'PDF-parse', 'JSDOM'],
    image: '/projects/verso.webp',
    githubUrl: 'https://github.com/ArikusumaWardana/verso-arsip',
    websiteUrl: 'https://verso-arsip.vercel.app/',
    category: 'Website'
  },
  {
    name: 'Orbita', 
    description: 'Orbita is an all-in-one personal productivity & financial intelligence workspace. It seamlessly unifies daily task management, event scheduling, multi-wallet cash flow tracking, and a context-aware AI assistant inside a modern interface.',
    techStack: ['Next.JS', 'Neon DB', 'Framer Motion', 'Gemini 3.6 Flash'],
    image: '/projects/orbita.webp',
    githubUrl: 'https://github.com/ArikusumaWardana/orbita',
    websiteUrl: 'https://orbita-memo.vercel.app/',
    category: 'Website'
  }
]

// Reverse order: index 0 appears at bottom, newest projects at top
const reversedProjects = computed(() => [...projects].reverse())

// Filter logic
const activeFilter = ref('All')
const filterCategories = ['All', 'Website', 'Game', 'Machine Learning']

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') {
    return reversedProjects.value
  }
  return reversedProjects.value.filter(project => project.category === activeFilter.value)
})

function setFilter(category) {
  activeFilter.value = category
  currentPage.value = 1 // Reset to first page of results
}

// Pagination logic
const currentPage = ref(1)
const itemsPerPage = 6

const totalPages = computed(() => Math.ceil(filteredProjects.value.length / itemsPerPage))

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProjects.value.slice(start, start + itemsPerPage)
})

function setPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // Scroll smoothly to top of projects view
    const element = document.querySelector('.projects-page')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
.projects-page {
  padding-top: calc(70px + var(--space-2xl));
  padding-bottom: var(--space-3xl);
  justify-content: flex-start;
}

.projects-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

.projects-grid {
  margin-top: var(--space-xl);
}

/* Filter Styles */
.filter-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-top: var(--space-lg);
  margin-bottom: var(--space-xl);
  animation: fadeIn var(--transition-slow) ease both;
  animation-delay: 0.1s;
}

.filter-btn {
  padding: 8px 16px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-secondary);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-standard);
}

.filter-btn:hover {
  color: var(--color-text-primary);
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.filter-btn.active {
  background: var(--color-accent-muted);
  border-color: var(--color-accent);
  color: var(--color-accent-text);
  font-weight: 600;
}

.filter-btn.active:hover {
  transform: translateY(-2px);
}

/* Pagination Styles */
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-3);
  margin-top: var(--space-5);
  animation: fadeIn var(--duration-base) var(--ease-standard) both;
  animation-delay: 0.2s;
}

.pagination-numbers {
  display: flex;
  gap: var(--space-1);
}

.pagination-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-secondary);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-standard);
  padding: 0;
}

.pagination-btn:hover:not(:disabled) {
  color: var(--color-accent);
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.pagination-btn.active {
  background: var(--color-accent-muted);
  border-color: var(--color-accent);
  color: var(--color-accent-text);
  font-weight: 600;
}

.pagination-btn.active:hover {
  transform: translateY(-2px);
}

.pagination-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .pagination-btn {
    width: 40px;
    height: 40px;
    font-size: 0.9rem;
  }
  
  .pagination-container {
    gap: var(--space-sm);
  }
  
  .filter-btn {
    padding: var(--space-sm) var(--space-md);
    font-size: 0.85rem;
  }
}
</style>
