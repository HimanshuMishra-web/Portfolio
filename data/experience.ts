export interface Experience {
  id: number
  title: string
  company: string
  location: string
  type: 'Full-time' | 'Part-time' | 'Freelance' | 'Internship' | 'Education'
  startDate: string
  endDate?: string
  current: boolean
  description: string
  responsibilities: string[]
  technologies: string[]
  achievements?: string[]
  logo?: string
}

export interface Education {
  id: number
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  description: string
  gpa?: string
  relevantCourses?: string[]
  achievements?: string[]
}

export const experienceData: Experience[] = [
  {
    id: 1,
    title: 'Full Stack Developer',
    company: 'TechCorp Solutions',
    location: 'Remote',
    type: 'Full-time',
    startDate: '2023',
    endDate: 'Present',
    current: true,
    description: 'Leading development of modern web applications using React, Node.js, and cloud technologies. Collaborating with cross-functional teams to deliver high-quality software solutions.',
    responsibilities: [
      'Develop and maintain full-stack web applications using React, TypeScript, and Node.js',
      'Design and implement RESTful APIs and GraphQL endpoints',
      'Collaborate with UI/UX designers to create responsive and accessible interfaces',
      'Optimize application performance and implement best practices',
      'Participate in code reviews and contribute to team knowledge sharing',
      'Mentor junior developers and provide technical guidance'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'GraphQL', 'Docker', 'AWS'],
    achievements: [
      'Improved application performance by 40% through optimization techniques',
      'Led successful migration from legacy system to modern React architecture',
      'Reduced bug reports by 60% through implementation of comprehensive testing',
      'Mentored 3 junior developers who successfully transitioned to mid-level roles'
    ]
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'Digital Innovations Inc.',
    location: 'New York, NY',
    type: 'Full-time',
    startDate: '2022',
    endDate: '2023',
    current: false,
    description: 'Specialized in building responsive and interactive user interfaces for e-commerce and SaaS applications. Worked closely with design teams to implement pixel-perfect designs.',
    responsibilities: [
      'Built responsive web applications using React, Next.js, and Tailwind CSS',
      'Implemented complex UI components and animations using Framer Motion',
      'Optimized applications for Core Web Vitals and accessibility standards',
      'Collaborated with backend teams to integrate APIs and services',
      'Participated in Agile development processes and sprint planning'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Jest', 'Storybook'],
    achievements: [
      'Reduced page load times by 50% through image optimization and lazy loading',
      'Achieved 100% accessibility compliance score across all applications',
      'Successfully delivered 15+ feature releases on time and within scope',
      'Implemented automated testing that increased code coverage to 85%'
    ]
  },
  {
    id: 3,
    title: 'Freelance Web Developer',
    company: 'Self-Employed',
    location: 'Remote',
    type: 'Freelance',
    startDate: '2021',
    endDate: '2022',
    current: false,
    description: 'Provided web development services to clients across various industries. Built custom websites, e-commerce platforms, and web applications tailored to client needs.',
    responsibilities: [
      'Developed custom websites and web applications for diverse client base',
      'Created responsive designs that work seamlessly across all devices',
      'Implemented SEO best practices and performance optimization',
      'Provided ongoing maintenance and support for client websites',
      'Managed project timelines and client communications'
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Vercel', 'WordPress', 'Shopify'],
    achievements: [
      'Completed 25+ successful projects with 100% client satisfaction',
      'Generated $50K+ in revenue through freelance development work',
      'Built long-term relationships with 8 recurring clients',
      'Developed reusable component library that reduced development time by 40%'
    ]
  },
  {
    id: 4,
    title: 'Software Development Intern',
    company: 'StartupXYZ',
    location: 'San Francisco, CA',
    type: 'Internship',
    startDate: '2021',
    endDate: '2021',
    current: false,
    description: 'Gained hands-on experience in modern web development practices while contributing to real-world projects. Learned agile methodologies and team collaboration.',
    responsibilities: [
      'Assisted in development of React-based web applications',
      'Participated in daily stand-ups and sprint planning meetings',
      'Fixed bugs and implemented minor features under senior developer guidance',
      'Learned version control practices and code review processes',
      'Contributed to documentation and testing efforts'
    ],
    technologies: ['React', 'JavaScript', 'Git', 'Jira', 'Postman'],
    achievements: [
      'Successfully completed 3-month internship with positive feedback',
      'Contributed to 2 major feature releases during internship period',
      'Learned modern development workflows and best practices',
      'Received full-time offer upon completion of internship'
    ]
  }
]

export const educationData: Education[] = [
  {
    id: 1,
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University of Technology',
    location: 'New York, NY',
    startDate: '2018',
    endDate: '2022',
    description: 'Comprehensive study of computer science fundamentals, software engineering principles, and modern development practices. Graduated with honors and completed capstone project.',
    gpa: '3.8/4.0',
    relevantCourses: [
      'Data Structures and Algorithms',
      'Software Engineering',
      'Database Systems',
      'Web Development',
      'Mobile App Development',
      'Artificial Intelligence',
      'Computer Networks',
      'Operating Systems'
    ],
    achievements: [
      'Graduated with Magna Cum Laude honors',
      'Completed capstone project: AI-powered recommendation system',
      'Served as Teaching Assistant for Web Development course',
      'Participated in hackathons and coding competitions',
      'Member of Computer Science Honor Society'
    ]
  },
  {
    id: 2,
    degree: 'High School Diploma',
    institution: 'Tech High School',
    location: 'New York, NY',
    startDate: '2014',
    endDate: '2018',
    description: 'Specialized in STEM subjects with focus on computer science and mathematics. Participated in various coding clubs and technology competitions.',
    gpa: '3.9/4.0',
    relevantCourses: [
      'Advanced Placement Computer Science',
      'Calculus BC',
      'Physics',
      'Statistics',
      'English Literature',
      'World History'
    ],
    achievements: [
      'Valedictorian of graduating class',
      'President of Computer Science Club',
      'First place in regional coding competition',
      'Perfect score on AP Computer Science exam',
      'National Merit Scholar'
    ]
  }
]

export const certificationsData = [
  {
    id: 1,
    name: 'AWS Certified Developer Associate',
    issuer: 'Amazon Web Services',
    date: '2023',
    description: 'Demonstrates expertise in developing and maintaining applications on AWS platform'
  },
  {
    id: 2,
    name: 'MongoDB Certified Developer',
    issuer: 'MongoDB University',
    date: '2023',
    description: 'Validates skills in MongoDB database development and administration'
  },
  {
    id: 3,
    name: 'React Developer Certification',
    issuer: 'Meta',
    date: '2022',
    description: 'Official certification for React development skills and best practices'
  },
  {
    id: 4,
    name: 'TypeScript Certification',
    issuer: 'Microsoft',
    date: '2022',
    description: 'Advanced TypeScript development and type system mastery'
  }
]

export const getCurrentExperience = (): Experience | undefined => {
  return experienceData.find(exp => exp.current)
}

export const getExperienceByType = (type: Experience['type']): Experience[] => {
  return experienceData.filter(exp => exp.type === type)
}

export const getSortedExperience = (): Experience[] => {
  return experienceData.sort((a, b) => {
    if (a.current && !b.current) return -1
    if (!a.current && b.current) return 1
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  })
} 