<template>
  <div class="page volunteers-page">
    <div class="volunteers-content animate-fadeIn">
      <div class="page-title">
        <h2>Volunteer <span class="text-accent">Activities</span></h2>
        <p>Giving back to the community and participating in social and tech initiatives</p>
      </div>

      <div class="volunteers-grid grid grid-3">
        <div
          v-for="(item, index) in volunteers"
          :key="item.title"
          class="card volunteer-card animate-fadeIn"
          :class="`delay-${(index + 1) * 100}`"
        >
          <div
            class="volunteer-image"
            @click="openModal(item)"
            role="button"
            tabindex="0"
            :aria-label="`View details for ${item.title}`"
            @keydown.enter="openModal(item)"
          >
            <img :src="item.image" :alt="item.title" loading="lazy" />
            <div class="image-overlay">
              <span class="overlay-badge">
                <Eye :size="15" />
                <span>Details</span>
              </span>
            </div>
          </div>
          <div class="volunteer-card-content">
            <div class="volunteer-header">
              <h3 class="volunteer-title">{{ item.title }}</h3>
              <span class="volunteer-date">{{ item.date }}</span>
            </div>
            <div class="volunteer-org">
              <HeartHandshake :size="16" />
              <span>{{ item.organization }}</span>
            </div>

            <div class="volunteer-footer">
              <div class="volunteer-tags" v-if="item.tags && item.tags.length">
                <span v-for="tag in item.tags" :key="tag" class="tag-badge">
                  {{ tag }}
                </span>
              </div>

              <button
                type="button"
                class="detail-icon-btn"
                @click="openModal(item)"
                aria-label="View volunteer details"
                title="View details"
              >
                <Eye :size="18" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Volunteer Detail Modal -->
    <Teleport to="body">
      <transition name="modal-fade">
        <div
          v-if="selectedVolunteer"
          class="modal-backdrop"
          @click.self="closeModal"
          role="dialog"
          aria-modal="true"
          :aria-label="selectedVolunteer.title"
        >
          <div class="modal-card">
            <!-- Modal Media Header -->
            <div class="modal-media">
              <img
                :src="selectedVolunteer.image"
                :alt="selectedVolunteer.title"
                class="modal-img"
              />
              <div class="modal-media-overlay"></div>
              <button
                type="button"
                class="modal-close-btn"
                @click="closeModal"
                aria-label="Close modal"
              >
                <X :size="20" />
              </button>
            </div>

            <!-- Modal Content -->
            <div class="modal-content">
              <div class="modal-meta">
                <div class="modal-org">
                  <HeartHandshake :size="16" />
                  <span>{{ selectedVolunteer.organization }}</span>
                </div>
                <span class="modal-date">{{ selectedVolunteer.date }}</span>
              </div>

              <h3 class="modal-title">{{ selectedVolunteer.title }}</h3>

              <!-- Description -->
              <div class="modal-section" v-if="selectedVolunteer.description">
                <h4 class="section-heading">Overview</h4>
                <p class="modal-desc">{{ selectedVolunteer.description }}</p>
              </div>

              <!-- Highlights -->
              <div
                class="modal-section"
                v-if="selectedVolunteer.highlights && selectedVolunteer.highlights.length"
              >
                <h4 class="section-heading">Key Contributions & Highlights</h4>
                <ul class="modal-highlights">
                  <li v-for="hl in selectedVolunteer.highlights" :key="hl">
                    {{ hl }}
                  </li>
                </ul>
              </div>

              <!-- Tags -->
              <div
                class="modal-section"
                v-if="selectedVolunteer.tags && selectedVolunteer.tags.length"
              >
                <h4 class="section-heading">Categories</h4>
                <div class="modal-tags">
                  <span v-for="tag in selectedVolunteer.tags" :key="tag" class="tag-badge">
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { HeartHandshake, Eye, X } from 'lucide-vue-next'
import { useHead } from '@unhead/vue'
import { seoConfig } from '../config/seo'

const selectedVolunteer = ref(null)

const openModal = (item) => {
  selectedVolunteer.value = item
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }
}

const closeModal = () => {
  selectedVolunteer.value = null
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
}

const handleKeydown = (e) => {
  if (e.key === 'Escape' && selectedVolunteer.value) {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})

useHead({
  title: 'Volunteers',
  meta: [
    {
      name: 'description',
      content: `Explore the community volunteering, event organizing, and social initiatives that ${seoConfig.fullName} (${seoConfig.displayName}) participated in.`
    },
    {
      name: 'keywords',
      content: `volunteer work, community services, GDG Bali, tech events, Build with AI, ${seoConfig.displayName}`
    },
    // Open Graph
    {
      property: 'og:title',
      content: `Volunteers | ${seoConfig.displayName}`
    },
    {
      property: 'og:description',
      content: `Explore the community volunteering, event organizing, and social initiatives that ${seoConfig.fullName} (${seoConfig.displayName}) participated in.`
    },
    // Twitter Cards
    {
      name: 'twitter:title',
      content: `Volunteers | ${seoConfig.displayName}`
    },
    {
      name: 'twitter:description',
      content: `Explore the community volunteering, event organizing, and social initiatives that ${seoConfig.fullName} (${seoConfig.displayName}) participated in.`
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${seoConfig.siteUrl}/volunteers/#webpage`,
        "url": `${seoConfig.siteUrl}/volunteers`,
        "name": `Volunteer Work of ${seoConfig.displayName}`,
        "description": `Community work and volunteer activities of ${seoConfig.fullName}.`,
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

const volunteers = [
  {
    title: "Runner Division at the BWAI x 2026 International Women's Day Event",
    organization: 'GDG Bali',
    date: 'Apr 2026',
    image: '/volunteers/BuildWithAi.webp',
    description: 'Served in the Runner Division for the Build With AI (BWAI) x International Women\'s Day event. Handled pre-event setup, hardware configurations, and venue logistics to ensure a successful tech event.',
    highlights: [
      'Helped set up the facilities the day before and on the day of the event',
      'Helped set up the equipment the day before and on the day of the event'
    ],
    tags: ['Tech', 'Community', 'Logistics']
  },
  {
    title: 'Event Volunteer - Hall Runner at DevFest Bali 2025',
    organization: 'GDG Bali',
    date: 'Dec 2025',
    image: '/volunteers/DevFest.webp',
    description: 'Worked as a Hall Runner at DevFest Bali 2025. Enabled smooth speaker transitions, coordinated active Q&A participation, and managed merchandise distribution to encourage audience engagement.',
    highlights: [
      'Ensured seamless transitions between sessions by assisting speakers with on-stage logistics.',
      'Facilitated dynamic Q&A sessions by managing microphone distribution to attendees efficiently.',
      'Collaborated with moderators to identify and distribute merchandise rewards to active participants, enhancing audience interaction.'
    ],
    tags: ['Tech', 'Community', 'Logistics']
  },
  {
    title: 'Event Organizer and technical at GDGoC Meetup with GDE - AI Edition',
    organization: 'GDGoC Primakara',
    date: 'Oct 2025',
    image: '/volunteers/GDGoC-Meetup.webp',
    description: 'Assisted in organizing the GDGoC Meetup with a Google Developer Expert (AI Edition). Managed event flow, facility setups, infrastructure prep, and hall layout arrangement for an optimal attendee experience.',
    highlights: [
      'Managing how the event runs',
      'Preparing facilities and infrastructure',
      'Arranging the event layout'
    ],
    tags: ['Tech', 'Community', 'Logistics']
  },
  {
    title: 'Member of the equipment division at the Google I/O Extended Bali 2025',
    organization: 'GDG Bali',
    date: 'Aug 2025',
    image: '/volunteers/GoogleI-O.webp',
    description: 'Supported Google I/O Extended Bali 2025 by managing venue readiness, seating arrangements, and attendee navigation. Also volunteered as a workshop facilitator to guide attendees through technical codelabs.',
    highlights: [
      'Helped take care of the room that would be used during the event.',
      'Helped arrange the chairs on the day of the event.',
      'Helped direct participants to the event hall.',
      'I was a facilitator at one of the workshops to help participants if they had difficulty following the material.'
    ],
    tags: ['Tech', 'Community', 'Support']
  },
  {
    title: 'Served as Committee Chair at the DevShare 2025 ',
    organization: 'Primakara Developers',
    date: 'Feb 2025',
    image: '/volunteers/Devshare2025.webp',
    description: 'Led the organization of DevShare 2025 as Committee Chair. Coordinated cross-functional teams, delegated key responsibilities, and established prep-to-execution timelines to ensure the event ran smoothly.',
    highlights: [
      'Coordinate the entire committee for the continuity of the event.',
      'Divide the jobdesk to all committee members and make sure everyone understands their role.',
      'Create a timeline from the beginning of preparation to the day of the event.'
    ],
    tags: ['Leadership', 'Tech', 'Event']
  },
  {
    title: 'Member of Security Division at Bali Startup Camp 2024',
    organization: 'HIMA IF Primakara',
    date: 'Dec 2024',
    image: '/volunteers/BSC.webp',
    description: 'Contributed to the security division at Bali Startup Camp 2024. Handled timeline planning, regulatory formulation for participants and organizers, logistics parking blueprints, and event day surveillance while tracking committee attendance recaps.',
    highlights: [
      'Create a timeline for the security division.',
      'Make rules for participants, and organizers.',
      'Create a vehicle parking plan for participants, organizers, invited guests, and mentors.',
      'Making a recap for committee attendance for every meeting, rehearsal, and also the day of the event.',
      'Maintain event security on the day of the event.'
    ],
    tags: ['Security', 'Management', 'Logistics']
  },
  {
    title: 'Security Division Coordinator',
    organization: 'Primakara English Competition',
    date: 'July 2024',
    image: '/volunteers/PEC.webp',
    description: 'Coordinated the security operations and team members for the Primakara English Competition. Created and executed detailed vehicle parking layouts and event day safety guidelines to ensure a secure and smooth experience for all attendees, guests, and judges.',
    highlights: [
      'Organize event security on the day of the event.',
      'Coordinate the security team on the day of the event.',
      'Make parking plans for participants, organizers, invited guests and judges.',
      'Organize motorcycle and car parking on the day of the event.'
    ],
    tags: ['Security', 'Logistics', 'Event']
  },
]
</script>

<style scoped>
.volunteers-page {
  padding-top: calc(70px + var(--space-2xl));
  padding-bottom: var(--space-3xl);
}

.volunteers-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

.volunteers-grid {
  margin-top: var(--space-xl);
  align-items: start;
}

.volunteer-card {
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  height: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  position: relative;
  transition: transform var(--duration-base) var(--ease-standard), border-color var(--duration-base) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard);
  animation: cardFloat 6s ease-in-out infinite, borderPulse 4s ease-in-out infinite;
}

.volunteer-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: -150%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.05),
    transparent
  );
  transform: skewX(-25deg);
  z-index: 2;
  pointer-events: none;
}

.volunteer-card:hover {
  transform: translate3d(0, -4px, 0) !important;
  border-color: var(--color-accent);
  box-shadow: 0 8px 24px -8px var(--color-accent-muted);
}

.volunteer-card:hover::after {
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    left: -150%;
  }
  100% {
    left: 250%;
  }
}

@keyframes borderPulse {
  0%, 100% {
    border-color: var(--color-border);
  }
  50% {
    border-color: rgba(0, 217, 163, 0.25);
  }
}

@keyframes cardFloat {
  0%, 100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, -6px, 0);
  }
}

.volunteer-card:nth-child(2n) {
  animation-duration: 5.5s;
  animation-delay: -1.5s;
}

.volunteer-card:nth-child(3n) {
  animation-duration: 6.5s;
  animation-delay: -3s;
}

.volunteer-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: var(--bg-secondary);
  cursor: pointer;
}

.volunteer-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.volunteer-card:hover .volunteer-image img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: rgba(11, 12, 14, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-standard);
  pointer-events: none;
}

.volunteer-card:hover .image-overlay {
  opacity: 1;
}

.overlay-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(18, 20, 24, 0.85);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  color: var(--color-text-primary);
  font-size: 0.75rem;
  font-weight: 600;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.overlay-badge svg {
  color: var(--color-accent);
}

.volunteer-card-content {
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  flex-grow: 1;
}

.volunteer-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-sm);
}

.volunteer-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.3;
}

.volunteer-date {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 8px;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  color: var(--color-accent);
  border-radius: var(--radius-sm);
  white-space: nowrap;
}

.volunteer-org {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-top: -2px;
}

.volunteer-org svg {
  color: var(--color-accent);
}

.volunteer-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  padding-top: var(--space-2);
}

.volunteer-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  flex: 1;
}

.detail-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: var(--radius-md);
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-standard);
  padding: 0;
  flex-shrink: 0;
}

.detail-icon-btn:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
  background: var(--color-surface);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--color-accent-muted);
}

/* ============================================
   Modal Styles
   ============================================ */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(8, 9, 11, 0.82);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: var(--z-modal, 200);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
}

.modal-card {
  position: relative;
  width: 100%;
  max-width: 620px;
  max-height: 88vh;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.modal-media {
  position: relative;
  width: 100%;
  height: 230px;
  flex-shrink: 0;
  background: var(--color-surface-raised);
  overflow: hidden;
}

.modal-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-media-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(18, 20, 24, 0.1), rgba(18, 20, 24, 0.9));
  pointer-events: none;
}

.modal-close-btn {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: rgba(18, 20, 24, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-standard);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 5;
}

.modal-close-btn:hover {
  background: var(--color-surface-raised);
  color: var(--color-accent);
  border-color: var(--color-accent);
  transform: scale(1.08);
}

.modal-content {
  padding: var(--space-4) var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.modal-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.modal-org {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: 0.95rem;
  color: var(--color-accent);
  font-weight: 600;
}

.modal-date {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  border-radius: var(--radius-sm);
}

.modal-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.35;
  margin-top: -4px;
}

.modal-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.section-heading {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--color-accent-text);
}

.modal-desc {
  font-size: 0.925rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.modal-highlights {
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.modal-highlights li {
  position: relative;
  padding-left: var(--space-3);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.modal-highlights li::before {
  content: '▹';
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-weight: bold;
}

.modal-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

/* Modal Transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity var(--duration-base) var(--ease-standard);
}

.modal-fade-enter-active .modal-card,
.modal-fade-leave-active .modal-card {
  transition: transform var(--duration-base) var(--ease-standard), opacity var(--duration-base) var(--ease-standard);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal-card,
.modal-fade-leave-to .modal-card {
  opacity: 0;
  transform: scale(0.94) translateY(14px);
}

.tag-badge {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 2px 8px;
  background: var(--color-surface-raised);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  transition: all var(--duration-fast) var(--ease-standard);
}

.volunteer-card:hover .tag-badge {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background: var(--color-surface);
}

@media (max-width: 1024px) {
  .volunteers-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .volunteers-page {
    padding-left: var(--space-3);
    padding-right: var(--space-3);
  }

  .volunteers-content {
    padding: 0;
    width: 100%;
  }

  .volunteers-grid {
    grid-template-columns: 1fr;
    margin-top: var(--space-4);
  }

  .volunteer-card {
    width: 100%;
  }

  .volunteer-image {
    height: 190px;
  }

  .volunteer-card-content {
    padding: var(--space-4);
  }

  .volunteer-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .volunteer-date {
    align-self: flex-start;
  }
}

@media (max-width: 480px) {
  .volunteers-page {
    padding-left: 10px;
    padding-right: 10px;
  }

  .volunteer-image {
    height: 180px;
  }

  .volunteer-card-content {
    padding: 14px 12px;
  }

  .volunteer-title {
    font-size: 1.05rem;
  }

  .volunteer-desc {
    font-size: 0.85rem;
  }

  .tag-badge {
    font-size: 0.675rem;
    padding: 2px 7px;
  }
}
@media (max-width: 640px) {
  .modal-backdrop {
    padding: var(--space-2);
  }

  .modal-card {
    max-height: 92vh;
  }

  .modal-media {
    height: 180px;
  }

  .modal-content {
    padding: var(--space-3);
    gap: var(--space-3);
  }

  .modal-title {
    font-size: 1.15rem;
  }
}
</style>
