<template>
  <div class="page volunteers-page">
    <div class="volunteers-content animate-fadeIn">
      <div class="page-title">
        <h1><span class="gradient-text">Volunteer Activities</span></h1>
        <p>Giving back to the community and participating in social and tech initiatives</p>
      </div>

      <div class="volunteers-grid grid grid-3">
        <div
          v-for="(item, index) in volunteers"
          :key="item.title"
          class="card volunteer-card animate-fadeIn"
          :class="`delay-${(index + 1) * 100}`"
        >
          <div class="volunteer-image">
            <img :src="item.image" :alt="item.title" />
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
            <p class="volunteer-desc">{{ item.description }}</p>
            
            <ul class="volunteer-highlights" v-if="item.highlights && item.highlights.length">
              <li v-for="hl in item.highlights" :key="hl">{{ hl }}</li>
            </ul>

            <div class="volunteer-tags" v-if="item.tags && item.tags.length">
              <span v-for="tag in item.tags" :key="tag" class="tag-badge">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { HeartHandshake } from 'lucide-vue-next'

const volunteers = [
  {
    title: "Runner Division at the BWAI x 2026 International Women's Day Event",
    organization: 'GDG Bali',
    date: 'Apr 2026',
    image: '/volunteers/BuildWithAi.jpeg',
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
    image: '/volunteers/DevFest.jpeg',
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
    image: '/volunteers/GDGoC-Meetup.jpeg',
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
    image: '/volunteers/GoogleI-O.jpeg',
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
    image: '/volunteers/Devshare2025.jpeg',
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
    image: '/volunteers/BSC.jpeg',
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
    image: '/volunteers/PEC.jpeg',
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
}

.volunteer-card {
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  height: 100%;
}

.volunteer-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: var(--bg-secondary);
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
  padding: var(--space-xs) var(--space-sm);
  background: var(--gradient-primary);
  color: white;
  border-radius: var(--radius-full);
  white-space: nowrap;
}

.volunteer-org {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-top: -2px;
}

.volunteer-org svg {
  color: var(--primary);
}

.volunteer-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.volunteer-highlights {
  margin-top: var(--space-xs);
  padding-left: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.volunteer-highlights li {
  position: relative;
  padding-left: var(--space-md);
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.volunteer-highlights li::before {
  content: '▹';
  position: absolute;
  left: 0;
  color: var(--primary);
  font-weight: bold;
}

.volunteer-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-top: auto; /* Push tags to the bottom of the card */
  padding-top: var(--space-sm);
}

.tag-badge {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: var(--space-xs) var(--space-sm);
  background: var(--bg-secondary);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);
}

.volunteer-card:hover .tag-badge {
  border-color: var(--primary-light);
  color: var(--primary-light);
  background: var(--bg-card);
}

@media (max-width: 1024px) {
  .volunteers-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .volunteers-grid {
    grid-template-columns: 1fr;
  }
}
</style>
