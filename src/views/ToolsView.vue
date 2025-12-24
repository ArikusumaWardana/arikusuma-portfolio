<template>
  <div class="page tools-page">
    <div class="tools-content animate-fadeIn">
      <div class="page-title">
        <h1><span class="gradient-text">My Tools</span></h1>
        <p>Software and platforms I use daily</p>
      </div>

      <div class="tools-grid grid grid-4">
        <ToolCard
          v-for="(tool, index) in tools"
          :key="tool.name"
          :name="tool.name"
          :description="tool.description"
          :icon="tool.icon"
          :iconUrl="tool.iconUrl"
          :class="`delay-${(index + 1) * 100}`"
          class="animate-fadeIn"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
    Box,
    Braces,
    Code2,
    Database,
    Gamepad2,
    GitBranch,
    Github,
    PenTool,
    Server
} from 'lucide-vue-next';
import ToolCard from '../components/ToolCard.vue';

const tools = [
  {
    name: 'VS Code',
    description: 'Powerful code editor for development',
    icon: Code2
  },
  {
    name: 'XAMPP',
    description: 'Local web server for PHP development',
    icon: Server
  },
  {
    name: 'Laragon',
    description: 'Portable development environment',
    icon: Box
  },
  {
    name: 'Supabase',
    description: 'Open source Firebase alternative',
    icon: Database
  },
  {
    name: 'GitHub',
    description: 'Version control and collaboration',
    icon: Github
  },
  {
    name: 'Unity',
    description: 'Game development platform',
    icon: Gamepad2
  },
  {
    name: 'Plastic SCM',
    description: 'Version control for game development',
    icon: GitBranch
  },
  {
    name: 'PhpStorm',
    description: 'Professional PHP IDE by JetBrains',
    icon: Braces
  },
  {
    name: 'DataGrip',
    description: 'Database IDE by JetBrains',
    icon: Database
  },
  {
    name: 'Draw.io',
    description: 'Diagram and flowchart maker',
    icon: PenTool
  }
]
</script>

<style scoped>
.tools-page {
  padding-top: calc(70px + var(--space-2xl));
  padding-bottom: var(--space-3xl);
}

.tools-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

.tools-grid {
  margin-top: var(--space-xl);
}

@media (max-width: 1024px) {
  .tools-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .tools-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .tools-grid {
    grid-template-columns: 1fr;
  }
}
</style>
