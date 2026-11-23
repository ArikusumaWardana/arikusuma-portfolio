export const profile = {
  fullName: 'Kadek Agus Arikusuma Wardana',
  displayName: 'Arikusuma Wardana',
  nickName: 'Arikusuma',
  introLine: 'Hello, I am Arikusuma Wardana',
  heroTitle: 'ARIKUSUMA',
  heroRole: 'Web Developer & Game Programmer',
  location: 'Denpasar, Bali, Indonesia',
  university: 'Primakara University',
  degree: 'S1 Informatics / Computer Science',
  email: 'arikusumawardana09@gmail.com',
  cvUrl: '/cv/CV_Kadek_Agus_Arikusuma_Wardana.pdf',
  avatar: '/profile.webp',
  bioLead: 'Informatics student at Primakara University crafting modern web applications and interactive game experiences.',
  bioParagraphs: [
    'I am Kadek Agus Arikusuma Wardana, a web developer and game programmer from Denpasar, Bali. I enjoy turning complex ideas into clean, functional, and user-friendly digital experiences backed by solid architecture.',
    'My technical focus bridges two domains: engineering responsive full-stack web applications with Vue.js, Next.js, and Laravel, and building immersive gameplay mechanics, AI behaviors, and interactive worlds in Unity using C#.'
  ],
  highlights: [
    'Full-Stack Web',
    'Unity Game Dev',
    'Agile Teamwork',
    'Continuous Learning'
  ],
  coreCompetencies: [
    'Clean Code & Component Architecture',
    'Responsive Web & UI/UX Engineering',
    'Game Physics, State & Gameplay Mechanics',
    'Git & Plastic SCM Team Collaboration'
  ],
  socialLinks: {
    github: 'https://github.com/ArikusumaWardana',
    linkedin: 'https://www.linkedin.com/in/arikusuma-wardana/',
    instagram: 'https://instagram.com/arikusuma.05',
    email: 'mailto:arikusumawardana09@gmail.com'
  }
}

export const navSections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'services', label: 'Services' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'tech-stack', label: 'Tech Stack' },
  { id: 'contacts', label: 'Contacts' }
]

export const experiences = [
  {
    title: 'Web Developer',
    organization: 'Bamboomedia',
    startDate: 'Dec 2021',
    endDate: 'Feb 2022',
    isCurrent: false,
    skills: ['HTML/CSS', 'PHP', 'JavaScript', 'Responsive Design'],
    description: [
      'Developed responsive web applications using modern web technologies',
      'Collaborated closely with cross-functional teams to deliver projects on schedule',
      'Resolved functional bugs and optimized overall website performance'
    ]
  },
  {
    title: 'S1 Informatics / Computer Science',
    organization: 'Primakara University',
    startDate: '2023',
    endDate: 'Ongoing',
    isCurrent: true,
    skills: ['Software Engineering', 'Algorithms', 'Databases', 'Web & Game Dev'],
    description: [
      'Focusing on software engineering principles, algorithm design, and database management',
      'Building production full-stack web platforms and competitive Unity game prototypes'
    ]
  },
  {
    title: 'Head of Tech Support',
    organization: 'GDGoC Primakara',
    startDate: 'Nov 2024',
    endDate: 'Oct 2025',
    isCurrent: false,
    skills: ['Technical Leadership', 'Event Facilitation', 'Community Support'],
    description: [
      'Leading the technical support team for the Google Developer Groups on Campus community',
      'Organizing and facilitating tech workshops, hackathons, and community meetups',
      'Providing technical assistance and hardware/software troubleshooting for members'
    ]
  },
  {
    title: 'Junior Game Programmer',
    organization: 'Socks.Studio',
    startDate: 'Dec 2025',
    endDate: 'May 2026',
    isCurrent: false,
    skills: ['Unity', 'C#', 'Game Optimization', 'Gameplay Mechanics'],
    description: [
      'Developing gameplay mechanics and interactive features using Unity',
      'Collaborating with designers and artists to implement game systems seamlessly',
      'Optimizing runtime performance and troubleshooting complex technical bugs'
    ]
  },
  {
    title: 'Game Programmer',
    organization: 'Palm Game Studio',
    startDate: 'Aug 2025',
    endDate: 'Present',
    isCurrent: true,
    skills: ['Unity', 'C#', 'Plastic SCM', 'Gameplay Logic', 'AI System'],
    description: [
      'Building and maintaining core game systems in Unity with C#',
      'Implementing fluid player controls, AI behaviors, and interactive mechanics',
      'Managing version control and collaborative team workflows using Plastic SCM'
    ]
  }
]

export const volunteers = [
  {
    title: 'Security Division Coordinator',
    organization: 'Primakara English Competition',
    date: 'July 2024',
    image: '/volunteers/PEC.webp',
    description: 'Coordinated security operations and team members for the Primakara English Competition. Executed detailed vehicle parking layouts and event day safety guidelines for attendees, guests, and judges.',
    highlights: [
      'Organized event security on the day of the event.',
      'Coordinated the security team on the day of the event.',
      'Planned parking layouts for participants, organizers, invited guests, and judges.',
      'Managed motorcycle and car parking operations on event day.'
    ],
    tags: ['Security', 'Logistics', 'Event']
  },
  {
    title: 'Security Division Member at Bali Startup Camp 2024',
    organization: 'HIMA IF Primakara',
    date: 'Dec 2024',
    image: '/volunteers/BSC.webp',
    description: 'Contributed to the security division at Bali Startup Camp 2024. Handled timeline planning, regulatory guidelines for participants and organizers, vehicle parking blueprints, and event day surveillance.',
    highlights: [
      'Created a timeline for the security division.',
      'Drafted rules for participants and organizers.',
      'Created a vehicle parking plan for participants, organizers, invited guests, and mentors.',
      'Tracked committee attendance across every meeting, rehearsal, and event day.',
      'Maintained event security throughout the event.'
    ],
    tags: ['Security', 'Management', 'Logistics']
  },
  {
    title: 'Committee Chair at DevShare 2025',
    organization: 'Primakara Developers',
    date: 'Feb 2025',
    image: '/volunteers/Devshare2025.webp',
    description: 'Led the organization of DevShare 2025 as Committee Chair. Coordinated cross-functional teams, delegated key responsibilities, and established prep-to-execution timelines to ensure the event ran smoothly.',
    highlights: [
      'Coordinated the entire committee for the continuity of the event.',
      'Divided the jobdesk across all committee members and ensured everyone understood their role.',
      'Created a timeline from the beginning of preparation to the day of the event.'
    ],
    tags: ['Leadership', 'Tech', 'Event']
  },
  {
    title: 'Equipment Division Member at Google I/O Extended Bali 2025',
    organization: 'GDG Bali',
    date: 'Aug 2025',
    image: '/volunteers/GoogleI-O.webp',
    description: 'Supported Google I/O Extended Bali 2025 by managing venue readiness, seating arrangements, and attendee navigation. Also volunteered as a workshop facilitator to guide attendees through technical codelabs.',
    highlights: [
      'Helped take care of the room that would be used during the event.',
      'Helped arrange the chairs on the day of the event.',
      'Helped direct participants to the event hall.',
      'Served as a facilitator at one of the workshops to help participants follow the material.'
    ],
    tags: ['Tech', 'Community', 'Support']
  },
  {
    title: 'Event Organizer & Technical at GDGoC Meetup with GDE - AI Edition',
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
    title: "Runner Division at the BWAI x 2026 International Women's Day Event",
    organization: 'GDG Bali',
    date: 'Apr 2026',
    image: '/volunteers/BuildWithAi.webp',
    description: "Served in the Runner Division for the Build With AI (BWAI) x International Women's Day event. Handled pre-event setup, hardware configurations, and venue logistics to ensure a smooth tech gathering.",
    highlights: [
      'Helped set up the facilities the day before and on the day of the event',
      'Helped set up the equipment the day before and on the day of the event'
    ],
    tags: ['Tech', 'Community', 'Logistics']
  }
]

export const services = [
  {
    title: 'Web Development',
    icon: 'Code2',
    description: 'Building fast, SEO-friendly web applications with Vue.js, Next.js, Laravel, and clean responsive interfaces.'
  },
  {
    title: 'Game Programming',
    icon: 'Gamepad2',
    description: 'Engineering responsive gameplay systems, state machines, AI behaviors, and interactive worlds in Unity with C#.'
  },
  {
    title: 'UI & Architecture',
    icon: 'Layers',
    description: 'Structuring maintainable component systems, intuitive user flows, and modern visual craft with Tailwind CSS.'
  },
  {
    title: 'Backend & AI/ML',
    icon: 'Database',
    description: 'Designing relational schemas on PostgreSQL, Supabase, and Prisma alongside applied TensorFlow and NLP workflows.'
  }
]

export const skillBars = [
  { name: 'Vue.js & Next.js', level: 92 },
  { name: 'Unity & C#', level: 90 },
  { name: 'JavaScript & TypeScript', level: 90 },
  { name: 'Tailwind CSS & UI Design', level: 92 },
  { name: 'Laravel & PHP', level: 85 },
  { name: 'PostgreSQL & Supabase', level: 84 }
]

export const techStackList = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'PHP',
  'C#',
  'SQL',
  'PostgreSQL',
  'Laravel',
  'Vue.js',
  'Next.js',
  'Tailwind CSS',
  'Bootstrap',
  'Prisma',
  'Git'
]

export const projectCategories = ['ALL', 'WEB', 'GAME', 'AI / ML']

export const projects = [
  {
    name: 'Orbita',
    description: 'Orbita is an all-in-one personal productivity & financial intelligence workspace. It seamlessly unifies daily task management, event scheduling, multi-wallet cash flow tracking, and a context-aware AI assistant inside a modern interface.',
    techStack: ['Next.JS', 'Neon DB', 'Framer Motion', 'Gemini 3.6 Flash'],
    image: '/projects/orbita.webp',
    githubUrl: 'https://github.com/ArikusumaWardana/orbita',
    websiteUrl: 'https://orbita-memo.vercel.app/',
    category: 'WEB'
  },
  {
    name: 'Verso',
    description: 'Verso is a personal archive for storing web articles and PDF papers. Articles are formatted for easy reading, PDFs are stored alongside the extracted text, and the entire collection is searchable via PostgreSQL full-text search.',
    techStack: ['Next.JS', 'Supabase', 'PostgreSQL', 'PDF-parse', 'JSDOM'],
    image: '/projects/verso.webp',
    githubUrl: 'https://github.com/ArikusumaWardana/verso-arsip',
    websiteUrl: 'https://verso-arsip.vercel.app/',
    category: 'WEB'
  },
  {
    name: 'SIGAP Website',
    description: 'SIGAP is a web platform that tracks the distribution of social assistance and public funds (bansos, CSR, village funds, scholarships) from the source to the end recipient, with every critical point recorded immutably on the blockchain.',
    techStack: ['Next.JS', 'Supabase', 'Blockchain'],
    image: '/projects/sigap.webp',
    category: 'WEB'
  },
  {
    name: 'EcoChain Website',
    description: 'EcoChain is a transparent green supply chain platform connecting eco-conscious producers, consumers, and independent verifiers. Consumers can browse certified sustainable products while tracing origin, carbon footprint, and verification status.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    image: '/projects/ecochain.webp',
    githubUrl: 'https://github.com/ArikusumaWardana/EcoChain-website',
    category: 'WEB'
  },
  {
    name: 'Paw Tennis',
    description: 'Paw Tennis brings tennis and roguelike progression together. Face your opponents on the court, keep the ball in play, and choose a power-up card every wave.',
    techStack: ['Unity', 'C#'],
    image: '/projects/paw-splash.webp',
    websiteUrl: 'https://palm-gamestudio.itch.io/pawsplash',
    category: 'GAME'
  },
  {
    name: 'Apsara Essence Website',
    description: 'Apsara Essence is born from the richness of Indonesian spices used for centuries in natural healing traditions, blending local wisdom with modern research to present functional aromatherapy.',
    techStack: ['Vue.js', 'Tailwind CSS'],
    image: '/projects/apsara-essence.webp',
    websiteUrl: 'https://apsara-essence.vercel.app/',
    githubUrl: 'https://github.com/ArikusumaWardana/Apsara-Essence',
    category: 'WEB'
  },
  {
    name: 'Vital Fizz Landing Page',
    description: 'VITAL FIZZ is a landing page website introducing carbonated herbal drinks that combine Indonesian spices with modern lifestyle aesthetics.',
    techStack: ['Vue.js', 'Tailwind CSS'],
    image: '/projects/vitalfizz.webp',
    websiteUrl: 'https://vitalfizz.vercel.app/',
    githubUrl: 'https://github.com/ArikusumaWardana/Vital-Fizz',
    category: 'WEB'
  },
  {
    name: 'Face Emotion Recognition Densenet',
    description: 'An end-to-end Face Emotion Recognition (FER) system built with TensorFlow and Transfer Learning (DenseNet121), including deployment-ready models in SavedModel, TF-Lite (Android), and TFJS (Web) formats.',
    techStack: ['Python', 'DenseNet121', 'TensorFlow', 'IPYNB'],
    image: '/projects/taskapp.svg',
    githubUrl: 'https://github.com/ArikusumaWardana/face-emotion-recognition-densenet',
    category: 'AI / ML'
  },
  {
    name: 'Animatronics Afterhours',
    description: "A horror game project inspired by Five Nights at Freddy's 2, featuring immersive gameplay crafted with real-life photo and video assets.",
    techStack: ['Unity', 'C#', 'Plastic SCM'],
    image: '/projects/animatronics%20afterhouse.webp',
    websiteUrl: 'https://gamejolt.com/games/animatronic_afterhours/1057914',
    category: 'GAME'
  },
  {
    name: 'Midnight Toys',
    description: 'A tense 1980s survival horror game where you manage CCTV, flashlights, security shutters, and fear levels to contain rogue adaptive living doll prototypes. Developed as a competition entry for GIMERSIA.',
    techStack: ['Unity', 'C#', 'Plastic SCM'],
    image: '/projects/midnight-toys.webp',
    websiteUrl: 'https://palm-gamestudio.itch.io/midnight-toys',
    category: 'GAME'
  },
  {
    name: 'Sentiment Analyst MLBB Reviews',
    description: 'A machine learning pipeline for performing sentiment analysis on Indonesian Mobile Legends game reviews.',
    techStack: ['Python', 'IPYNB', 'NLP'],
    image: '/projects/taskapp.svg',
    githubUrl: 'https://github.com/ArikusumaWardana/Sentiment-Analysis-MLBB',
    category: 'AI / ML'
  },
  {
    name: 'Tisgumi Website',
    description: 'A professional business landing page for Tisgumi, featuring an integrated point-of-sale cashier system.',
    techStack: ['TypeScript', 'Next.js', 'Prisma', 'Supabase', 'Vercel'],
    image: '/projects/tisgumi.webp',
    websiteUrl: 'https://tisgumi.vercel.app/',
    githubUrl: 'https://github.com/ArikusumaWardana/tisgumi-website',
    category: 'WEB'
  },
  {
    name: 'Movieque Website',
    description: 'A movie discovery application that displays detailed information about films, including ratings, synopsis, and cast.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'API', 'Vercel'],
    image: '/projects/movieque.webp',
    websiteUrl: 'https://movieque-tau.vercel.app/',
    githubUrl: 'https://github.com/ArikusumaWardana/movieque',
    category: 'WEB'
  },
  {
    name: 'ScxLyrics Website',
    description: 'A lyrics discovery platform that allows users to search and view song lyrics from various artists.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'PHP'],
    image: '/projects/scxlyrics.webp',
    githubUrl: 'https://github.com/ArikusumaWardana/scxlyrics',
    category: 'WEB'
  },
  {
    name: 'Novels Up Website',
    description: 'A reading platform designed for light novel and web novel enthusiasts to discover and read various stories.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Laravel'],
    image: '/projects/novels-up.webp',
    githubUrl: 'https://github.com/ArikusumaWardana/Novels-Up',
    category: 'WEB'
  },
  {
    name: 'Clock Website',
    description: 'A minimalist digital clock application displaying the current day, date, month, and time in real-time.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    image: '/projects/clock.webp',
    websiteUrl: 'https://arikusumawardana.github.io/Clock/',
    githubUrl: 'https://github.com/ArikusumaWardana/Clock',
    category: 'WEB'
  },
  {
    name: 'Refill Universe Website',
    description: 'A community website built for the Morning 2 Informatics class of Primakara University to share resources and connect.',
    techStack: ['Vue.js', 'Tailwind CSS', 'Vercel'],
    image: '/projects/reffill-universe.webp',
    websiteUrl: 'https://refill-universe.vercel.app/',
    githubUrl: 'https://github.com/ArikusumaWardana/refill-universe',
    category: 'WEB'
  },
  {
    name: 'Primdev Blog',
    description: 'A modern blog platform that fetches and displays content dynamically from an external API.',
    techStack: ['Vue.js', 'Tailwind CSS', 'API', 'Vercel'],
    image: '/projects/primdev-blog.webp',
    websiteUrl: 'https://primdev-blog.vercel.app/',
    githubUrl: 'https://github.com/ArikusumaWardana/primdev-blog',
    category: 'WEB'
  },
  {
    name: 'Buku Explore Website',
    description: 'An e-commerce platform for browsing and purchasing books with a clean and user-friendly interface.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Laravel'],
    image: '/projects/buku-explore.webp',
    githubUrl: 'https://github.com/ArikusumaWardana/BukuExplore-Website',
    category: 'WEB'
  },
  {
    name: 'Kwitansi Website',
    description: 'A streamlined web application for creating and generating simple receipts with PDF export functionality.',
    techStack: ['HTML', 'CSS', 'Bootstrap', 'PHP', 'mPDF'],
    image: '/projects/kwitansi.webp',
    githubUrl: 'https://github.com/ArikusumaWardana/form-kwitansi',
    category: 'WEB'
  }
]

// Representative collaboration testimonials aligned to Arikusuma's domains; replace with verbatim quotes anytime
export const testimonials = [
  {
    quote: 'Arikusuma translates gameplay concepts into reliable, cleanly structured Unity C# systems with impressive speed. His attention to player feel and edge-case stability kept our milestones consistently on track.',
    author: 'Game Design Lead',
    role: 'Palm Game Studio Collaborator',
    initials: 'PG'
  },
  {
    quote: 'From leading technical support logistics at GDGoC Primakara to stepping up as Committee Chair for DevShare 2025, Arikusuma brings calm execution, clear communication, and dependable engineering under pressure.',
    author: 'Community Organizing Team',
    role: 'GDGoC Primakara & Primakara Developers',
    initials: 'GD'
  },
  {
    quote: 'Working with Arikusuma on full-stack web builds is seamless. Whether structuring a Supabase backend or refining responsive Vue and Next.js interfaces, he delivers thoughtful architecture and crisp visual polish.',
    author: 'Web Product Partner',
    role: 'Full-Stack Web Collaboration',
    initials: 'WP'
  }
]

export const ecosystemBrands = [
  { name: 'HTML', key: 'html', icon: 'Globe', role: 'Markup' },
  { name: 'CSS', key: 'css', icon: 'Palette', role: 'Styling' },
  { name: 'JavaScript', key: 'javascript', icon: 'Braces', role: 'Language' },
  { name: 'TypeScript', key: 'typescript', icon: 'Code2', role: 'Typed JS' },
  { name: 'PHP', key: 'php', icon: 'FileCode', role: 'Backend Language' },
  { name: 'C#', key: 'csharp', icon: 'Cpu', role: 'Game & App Language' },
  { name: 'SQL', key: 'sql', icon: 'Database', role: 'Query Language' },
  { name: 'PostgreSQL', key: 'postgresql', icon: 'Database', role: 'Relational DB' },
  { name: 'Laravel', key: 'laravel', icon: 'Layers', role: 'PHP Ecosystem' },
  { name: 'Vue.js', key: 'vue', icon: 'Boxes', role: 'Frontend Framework' },
  { name: 'Next.js', key: 'nextjs', icon: 'Code2', role: 'Full-Stack React' },
  { name: 'Tailwind CSS', key: 'tailwind', icon: 'Palette', role: 'Utility CSS' },
  { name: 'Bootstrap', key: 'bootstrap', icon: 'Layers', role: 'UI Toolkit' },
  { name: 'Prisma', key: 'prisma', icon: 'Database', role: 'Type-Safe ORM' },
  { name: 'Git', key: 'git', icon: 'Terminal', role: 'Version Control' },
  { name: 'Unity', key: 'unity', icon: 'Gamepad2', role: 'Game Engine' },
  { name: 'Supabase', key: 'supabase', icon: 'Zap', role: 'Postgres & Auth' }
]

export const dailyTools = [
  { name: 'VS Code', description: 'Primary code editor' },
  { name: 'Unity', description: 'Game development engine' },
  { name: 'GitHub', description: 'Version control & collaboration' },
  { name: 'Supabase', description: 'Postgres backend & storage' },
  { name: 'Docker', description: 'Containerized environments' },
  { name: 'Plastic SCM', description: 'Game asset & code versioning' },
  { name: 'PhpStorm', description: 'JetBrains PHP IDE' },
  { name: 'DataGrip', description: 'Database management IDE' },
  { name: 'Laragon', description: 'Portable local stack' },
  { name: 'XAMPP', description: 'Local PHP server' },
  { name: 'Draw.io', description: 'System & flow diagrams' }
]
