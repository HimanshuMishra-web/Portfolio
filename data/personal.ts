export interface PersonalInfo {
  name: string
  title: string
  email: string
  phone?: string
  location: string
  bio: string
  shortBio: string
  avatar: string
  resume: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
  color: string
}

export interface ContactInfo {
  email: string
  phone?: string
  location: string
  availability: string
  responseTime: string
}

export const personalInfo: PersonalInfo = {
  name: 'Himanshu Mishra',
  title: 'Full Stack Developer',
  email: 'himanshu.mishra@example.com',
  phone: '+91 8439738074',
  location: 'Uttar Pradesh, India',
  bio: `I'm a passionate Full Stack Developer with over 3 years of experience building modern web applications. I specialize in React, TypeScript, and Node.js, creating scalable solutions that deliver exceptional user experiences.

My journey in software development started with a curiosity about how things work on the web, which led me to pursue a Computer Science degree and dive deep into modern web technologies. I've worked on diverse projects ranging from AI-powered applications to e-commerce platforms, always focusing on clean code, performance, and user-centric design.

When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I believe in continuous learning and staying up-to-date with the latest industry trends and best practices.`,
  shortBio: 'Passionate Full Stack Developer specializing in React, TypeScript, and Node.js. Creating modern, scalable web applications with a focus on performance and user experience.',
  avatar: '/profile.png',
  resume: '/resume.pdf'
}

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/HimanshuMishra-web',
    icon: 'github',
    color: 'hover:text-gray-900 dark:hover:text-white'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/himanshu-mishra-dev',
    icon: 'linkedin',
    color: 'hover:text-blue-600'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/himanshu_dev',
    icon: 'twitter',
    color: 'hover:text-blue-400'
  },
  {
    name: 'Portfolio',
    url: 'https://himanshu-portfolio.vercel.app',
    icon: 'globe',
    color: 'hover:text-green-600'
  },
  {
    name: 'Email',
    url: 'mailto:hmishra1210.work@gmail.com',
    icon: 'mail',
    color: 'hover:text-red-600'
  }
]

export const contactInfo: ContactInfo = {
  email: 'hmishra1210@gmail.com',
  phone: '+91 8439738074',
  location: 'Uttar Pradesh, India',
  availability: 'Available for new opportunities',
  responseTime: 'Usually responds within 24 hours'
}

export const aboutData = {
  summary: `I'm a Full Stack Developer passionate about creating innovative web solutions. With expertise in modern JavaScript frameworks and cloud technologies, I build scalable applications that solve real-world problems.`,
  
  highlights: [
    '3+ years of professional development experience',
    'Expert in React, TypeScript, and Node.js',
    'Experience with cloud platforms (AWS, Vercel)',
    'Strong focus on performance and accessibility',
    'Agile development and team collaboration',
    'Open source contributor and community advocate'
  ],
  
  interests: [
    'Artificial Intelligence and Machine Learning',
    'Web Performance Optimization',
    'Open Source Development',
    'Technical Writing and Documentation',
    'Mentoring Junior Developers',
    'Attending Tech Conferences and Meetups'
  ],
  
  goals: [
    'Contribute to impactful open-source projects',
    'Master advanced cloud architecture patterns',
    'Lead development of AI-powered applications',
    'Mentor and grow the next generation of developers',
    'Build sustainable and scalable software solutions'
  ]
}

export const statsData = {
  projects: 25,
  experience: '3+ years',
  technologies: 15,
  clients: 12,
  satisfaction: '100%',
  responseTime: '< 24 hours'
}

export const testimonialsData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'TechCorp Solutions',
    content: 'Himanshu is an exceptional developer who consistently delivers high-quality code. His attention to detail and problem-solving skills are outstanding.',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Senior Developer',
    company: 'Digital Innovations Inc.',
    content: 'Working with Himanshu was a great experience. He\'s not only technically skilled but also great at communicating complex ideas clearly.',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Startup Founder',
    company: 'StartupXYZ',
    content: 'Himanshu helped us build our MVP from scratch. His expertise in React and Node.js was invaluable to our project success.',
    rating: 5
  }
] 