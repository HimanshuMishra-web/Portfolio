export interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  image: string
  screenshots: string[]
  technologies: string[]
  githubUrl: string
  liveUrl: string
  date: string
  duration: string
  teamSize: string
  category: string
  featured: boolean
  challenges: string[]
  solutions: string[]
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: 'MemeForge (AI Meme Generator)',
    description: 'A modern meme generator platform with AI-powered text-to-image generation, trending templates, instant sharing, and community features.',
    longDescription: `MemeForge is a comprehensive meme generation platform that combines AI technology with creative tools to help users create, customize, and share hilarious memes. Built with React and TypeScript, it features a modern, intuitive interface with AI-powered text-to-image generation capabilities.

The platform offers a wide range of trending templates, instant sharing to social media platforms, and a vibrant community where users can discover and share their creations. The application integrates advanced AI technology for generating unique meme images from text prompts.

Key features include:
• AI-powered text-to-image generation
• Trending meme templates library
• Instant social media sharing
• Community highlights and user galleries
• User authentication and profile management
• Password recovery system
• Premium features and subscriptions
• Responsive design for all devices
• Real-time template updates
• Advanced meme customization tools`,
    image: '/projects/meme-generator/home.webp',
    screenshots: [
      '/projects/meme-generator/home.webp',
      '/projects/meme-generator/creator.webp',
      '/projects/meme-generator/template.webp',
      '/projects/meme-generator/community.webp',
      '/projects/meme-generator/login.webp',
      '/projects/meme-generator/signup.webp',
      '/projects/meme-generator/premium.webp',
      '/projects/meme-generator/support.webp',
      '/projects/meme-generator/contact.webp',
      '/projects/meme-generator/reset.webp'
    ],
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'AI Integration', 'Node.js'],
    githubUrl: 'https://github.com/HimanshuMishra-web/meme-generator',
    liveUrl: 'https://memeforge-demo.vercel.app',
    date: '2025',
    duration: '4-5 weeks',
    teamSize: 'Solo',
    category: 'Full-Stack',
    featured: true,
    challenges: [
      'Integrating AI text-to-image generation',
      'Building a responsive template library',
      'Implementing social media sharing',
      'Creating an engaging community interface'
    ],
    solutions: [
      'Used advanced AI APIs with proper error handling and rate limiting',
      'Built a modular template system with lazy loading',
      'Integrated social media APIs for instant sharing',
      'Designed an intuitive community interface with real-time updates'
    ]
  }
] 