export interface NavigationItem {
  name: string
  href: string
  description?: string
  icon?: string
}

export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    github: string
    linkedin: string
    twitter: string
  }
}

export interface FooterLink {
  name: string
  href: string
  external?: boolean
}

export const siteConfig: SiteConfig = {
  name: 'Himanshu Mishra - Full Stack Developer',
  description: 'Full Stack Developer specializing in React, TypeScript, and Node.js. Building modern, scalable web applications.',
  url: 'https://himanshu-portfolio.vercel.app',
  ogImage: '/og-image.jpg',
  links: {
    github: 'https://github.com/HimanshuMishra-web',
    linkedin: 'https://linkedin.com/in/himanshu-mishra-dev',
    twitter: 'https://twitter.com/himanshu_dev'
  }
}

export const navigationItems: NavigationItem[] = [
  {
    name: 'Home',
    href: '/',
    description: 'Welcome to my portfolio',
    icon: 'home'
  },
  {
    name: 'About',
    href: '/about',
    description: 'Learn more about me and my journey',
    icon: 'user'
  },
  {
    name: 'Projects',
    href: '/projects',
    description: 'Explore my latest work and projects',
    icon: 'folder'
  },
  {
    name: 'Contact',
    href: '/contact',
    description: 'Get in touch for collaborations',
    icon: 'mail'
  }
]

export const footerLinks: FooterLink[] = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'About',
    href: '/about'
  },
  {
    name: 'Projects',
    href: '/projects'
  },
  {
    name: 'Contact',
    href: '/contact'
  },
  {
    name: 'GitHub',
    href: 'https://github.com/HimanshuMishra-web',
    external: true
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/himanshu-mishra-dev',
    external: true
  },
  {
    name: 'Resume',
    href: '/resume.pdf',
    external: true
  }
]

export const projectCategories = [
  'All',
  'Full-Stack',
  'Frontend',
  'Backend',
  'Mobile Apps',
  'Web Apps'
]

export const skillCategories = [
  'Frontend Development',
  'Backend Development',
  'Mobile Development',
  'DevOps & Tools',
  'AI & Integration',
  'Design & UX',
  'Testing & Quality'
]

export const contactFormFields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    placeholder: 'Your full name'
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'your.email@example.com'
  },
  {
    name: 'subject',
    label: 'Subject',
    type: 'text',
    required: true,
    placeholder: 'What is this about?'
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    required: true,
    placeholder: 'Tell me about your project or inquiry...'
  }
]

export const seoData = {
  title: 'Himanshu Mishra - Full Stack Developer',
  description: 'Full Stack Developer specializing in React, TypeScript, and Node.js. Building modern, scalable web applications with a focus on performance and user experience.',
  keywords: [
    'Full Stack Developer',
    'React Developer',
    'TypeScript Developer',
    'Node.js Developer',
    'Web Developer',
    'Frontend Developer',
    'Backend Developer',
    'JavaScript Developer',
    'Portfolio',
    'Web Development'
  ],
  author: 'Himanshu Mishra',
  siteName: 'Himanshu Mishra Portfolio',
  twitterHandle: '@himanshu_dev'
}

export const themeConfig = {
  primaryColor: '#3B82F6',
  secondaryColor: '#1F2937',
  accentColor: '#10B981',
  darkMode: true,
  animations: true
}

export const analyticsConfig = {
  googleAnalyticsId: 'G-XXXXXXXXXX',
  googleTagManagerId: 'GTM-XXXXXXXX',
  enableAnalytics: false
}

export const performanceConfig = {
  imageOptimization: true,
  lazyLoading: true,
  preloadCriticalResources: true,
  enableServiceWorker: false
} 