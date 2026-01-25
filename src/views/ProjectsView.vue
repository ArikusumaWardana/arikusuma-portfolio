<template>
  <div class="page projects-page">
    <div class="projects-content animate-fadeIn">
      <div class="page-title">
        <h1><span class="gradient-text">My Projects</span></h1>
        <p>Some of my recent work and side projects</p>
      </div>

      <div class="projects-grid grid grid-3">
        <ProjectCard
          v-for="(project, index) in reversedProjects"
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
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import ProjectCard from '../components/ProjectCard.vue';

const projects = [
  {
    name: 'Kwitansi Website',
    description: 'A streamlined web application for creating and generating simple receipts with PDF export functionality.',
    image: '/projects/kwitansi.png',
    techStack: ['HTML', 'CSS', 'Bootstrap', 'PHP', 'mPDF'],
    githubUrl: 'https://github.com/ArikusumaWardana/form-kwitansi'
  },
  {
    name: 'Buku Explore Website',
    description: 'An e-commerce platform for browsing and purchasing books with a clean and user-friendly interface.',
    image: '/projects/buku-explore.png',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Laravel'],
    githubUrl: 'https://github.com/ArikusumaWardana/BukuExplore-Website'
  },
  {
    name: 'Primdev Blog',
    description: 'A modern blog platform that fetches and displays content dynamically from an external API.',
    image: '/projects/primdev-blog.png',
    techStack: ['Vue.js', 'Tailwind CSS', 'API', 'Vercel'],
    websiteUrl: 'https://primdev-blog.vercel.app/',
    githubUrl: 'https://github.com/ArikusumaWardana/primdev-blog'
  },
  {
    name: 'Refill Universe Website',
    description: 'A community website built for the Morning 2 Informatics class of Primakara University to share resources and connect.',
    image: '/projects/reffill-universe.png',
    techStack: ['Vue.js', 'Tailwind CSS', 'Vercel'],
    websiteUrl: 'https://refill-universe.vercel.app/',
    githubUrl: 'https://github.com/ArikusumaWardana/refill-universe'
  },
  {
    name: 'Clock Website',
    description: 'A minimalist digital clock application displaying the current day, date, month, and time in real-time.',
    image: '/projects/clock.png',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    websiteUrl: 'https://arikusumawardana.github.io/Clock/',
    githubUrl: 'https://github.com/ArikusumaWardana/Clock'
  },
  {
    name: 'Novels Up Website',
    description: 'A reading platform designed for light novel and web novel enthusiasts to discover and read various stories.',
    image: '/projects/novels-up.png',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Laravel'],
    githubUrl: 'https://github.com/ArikusumaWardana/Novels-Up'
  },
  {
    name: 'ScxLyrics Website',
    description: 'A lyrics discovery platform that allows users to search and view song lyrics from various artists.',
    image: '/projects/scxlyrics.png',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'PHP'],
    githubUrl: 'https://github.com/ArikusumaWardana/scxlyrics'
  },
  {
    name: 'Movieque Website',
    description: 'A movie discovery application that displays detailed information about films, including ratings, synopsis, and cast.',
    image: '/projects/movieque.png',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'API', 'Vercel'],
    websiteUrl: 'https://movieque-tau.vercel.app/',
    githubUrl: 'https://github.com/ArikusumaWardana/movieque'
  },
  {
    name: 'Tisgumi Website',
    description: 'A professional business landing page for Tisgumi, featuring an integrated point-of-sale cashier system.',
    image: '/projects/tisgumi.png',
    techStack: ['TypeScript', 'Next.js', 'Prisma', 'Supabase', 'Vercel'],
    websiteUrl: 'https://tisgumi.vercel.app/',
    githubUrl: 'https://github.com/ArikusumaWardana/tisgumi-website'
  },
  {
    name: 'Sentiment Analyst MLBB Reviews',
    description: 'A machine learning pipeline for performing sentiment analysis on Indonesian Mobile Legends game reviews.',
    image: '/projects/game.svg',
    techStack: ['Python', 'IPYNB', 'NLP'],
    githubUrl: 'https://github.com/ArikusumaWardana/Sentiment-Analysis-MLBB'
  },
  {
    name: 'Animatronics Afterhouse',
    description: 'A horror game project inspired by Five Nights at Freddy\'s 2, featuring immersive gameplay using real-life photo and video assets.',
    image: '/projects/animatronics afterhouse.png',
    techStack: ['Unity', 'C#', 'Plastic CSM'],
  },
  {
    name: "Face Emotion Recognition Densenet",
    description: "An end-to-end Face Emotion Recognition (FER) system built with TensorFlow and Transfer Learning (DenseNet121), includes deployment-ready models in SavedModel, TF-Lite (Android), and TFJS (Web) formats.",
    image:'/projects/game.svg',
    techStack: ['Python', 'DenseNet121', 'TensorFlow', 'IPYNB'],
    githubUrl: 'https://github.com/ArikusumaWardana/face-emotion-recognition-densenet'
  },
  {
    name: 'Vital Fizz Landing Page',
    description: "VITAL FIZZ is a landing page website introducing carbonated herbal drinks that combine Indonesian spices with today's lifestyle.",
    techStack: ['Vue JS', 'Tailwind CSS'],
    image: '/projects/vitalfizz.png',
    websiteUrl: 'https://vitalfizz.vercel.app/',
    githubUrl: 'https://github.com/ArikusumaWardana/Vital-Fizz'
  }
]

// Reverse order: index 0 appears at bottom, newest projects at top
const reversedProjects = computed(() => [...projects].reverse())
</script>

<style scoped>
.projects-page {
  padding-top: calc(70px + var(--space-2xl));
  padding-bottom: var(--space-3xl);
}

.projects-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

.projects-grid {
  margin-top: var(--space-xl);
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
}
</style>
