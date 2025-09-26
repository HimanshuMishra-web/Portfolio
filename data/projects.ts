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
  },
  {
    "id": 6,
    "title": "AI Chatbot Assistant",
    "description": "An intelligent conversational AI chatbot built with Next.js, featuring natural language processing, knowledge base integration, and real-time chat capabilities.",
    "longDescription": "AI Chatbot Assistant is a sophisticated conversational AI platform designed to provide intelligent responses and assistance through natural language processing. Built with modern web technologies, it features a seamless chat interface, knowledge base integration for accurate information retrieval, and scalable architecture for high-performance interactions.\n\nThe platform leverages advanced AI models to understand user queries, maintain context in conversations, and provide relevant, helpful responses. It includes features for document indexing, vector search for knowledge retrieval, and a user-friendly interface for both desktop and mobile devices.\n\nKey features include:\n• Intelligent conversation handling with context awareness\n• Knowledge base integration with document indexing\n• Real-time chat interface with typing indicators\n• Vector search for accurate information retrieval\n• Responsive design for all devices\n• API endpoints for chat and indexing\n• Data storage with vector and document stores\n• Scalable architecture with Next.js and Node.js\n• TypeScript for type safety and maintainability\n• Tailwind CSS for modern, responsive UI",
    "image": "/projects/chatbot/home.webp",
    "screenshots": [
      "/projects/chatbot/home.webp",
      "/projects/chatbot/chat.webp",
      "/projects/chatbot/settings.webp"
    ],
    "technologies": ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "AI Integration", "Vector Search"],
    "githubUrl": "https://github.com/HimanshuMishra-web/chatbot",
    "liveUrl": "https://portfolio-chat-bot-three.vercel.app/",
    "date": "2025",
    "duration": "1 week",
    "teamSize": "Solo",
    "category": "AI Chatbot",
    "featured": true,
    "challenges": [
      "Implementing advanced AI conversation logic",
      "Building scalable real-time chat interface",
      "Integrating vector search for knowledge retrieval",
      "Ensuring accurate and context-aware responses"
    ],
    "solutions": [
      "Used state-of-the-art AI models with optimized prompting",
      "Built responsive chat UI with WebSocket-like real-time updates",
      "Implemented vector embeddings for efficient knowledge search",
      "Added comprehensive validation and context management"
    ],
  }
] 