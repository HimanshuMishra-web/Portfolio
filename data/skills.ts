export interface Skill {
  name: string
  category: string
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  icon?: string
  description?: string
}

export interface SkillCategory {
  name: string
  description: string
  skills: Skill[]
}

export const skillsData: SkillCategory[] = [
  {
    name: 'Frontend Development',
    description: 'Modern frontend technologies and frameworks for building responsive web applications',
    skills: [
      {
        name: 'React',
        category: 'Frontend',
        proficiency: 'Expert',
        icon: '⚛️',
        description: 'Building scalable component-based applications with hooks and context'
      },
      {
        name: 'TypeScript',
        category: 'Frontend',
        proficiency: 'Advanced',
        icon: '📘',
        description: 'Type-safe JavaScript development with interfaces and generics'
      },
      {
        name: 'Next.js',
        category: 'Frontend',
        proficiency: 'Advanced',
        icon: '⚡',
        description: 'Full-stack React framework with SSR and static generation'
      },
      {
        name: 'Tailwind CSS',
        category: 'Frontend',
        proficiency: 'Expert',
        icon: '🎨',
        description: 'Utility-first CSS framework for rapid UI development'
      },
      {
        name: 'HTML5 & CSS3',
        category: 'Frontend',
        proficiency: 'Expert',
        icon: '🌐',
        description: 'Semantic markup and modern CSS with animations'
      },
      {
        name: 'JavaScript (ES6+)',
        category: 'Frontend',
        proficiency: 'Expert',
        icon: '🟨',
        description: 'Modern JavaScript with async/await, modules, and destructuring'
      }
    ]
  },
  {
    name: 'Backend Development',
    description: 'Server-side development and API creation with modern technologies',
    skills: [
      {
        name: 'Node.js',
        category: 'Backend',
        proficiency: 'Advanced',
        icon: '🟢',
        description: 'Server-side JavaScript runtime with Express framework'
      },
      {
        name: 'Express.js',
        category: 'Backend',
        proficiency: 'Advanced',
        icon: '🚀',
        description: 'Fast, unopinionated web framework for Node.js'
      },
      {
        name: 'MongoDB',
        category: 'Backend',
        proficiency: 'Intermediate',
        icon: '🍃',
        description: 'NoSQL database with Mongoose ODM'
      },
      {
        name: 'GraphQL',
        category: 'Backend',
        proficiency: 'Intermediate',
        icon: '🔵',
        description: 'Query language and runtime for APIs'
      },
      {
        name: 'REST APIs',
        category: 'Backend',
        proficiency: 'Advanced',
        icon: '🌐',
        description: 'Designing and implementing RESTful APIs'
      }
    ]
  },
  {
    name: 'Mobile Development',
    description: 'Cross-platform mobile app development with React Native',
    skills: [
      {
        name: 'React Native',
        category: 'Mobile',
        proficiency: 'Intermediate',
        icon: '📱',
        description: 'Cross-platform mobile development with JavaScript'
      },
      {
        name: 'Expo',
        category: 'Mobile',
        proficiency: 'Intermediate',
        icon: '⚡',
        description: 'React Native development platform and tools'
      },
      {
        name: 'Mobile UI/UX',
        category: 'Mobile',
        proficiency: 'Intermediate',
        icon: '🎨',
        description: 'Designing intuitive mobile interfaces'
      }
    ]
  },
  {
    name: 'DevOps & Tools',
    description: 'Development operations, deployment, and development tools',
    skills: [
      {
        name: 'Git & GitHub',
        category: 'DevOps',
        proficiency: 'Advanced',
        icon: '📚',
        description: 'Version control and collaborative development'
      },
      {
        name: 'Docker',
        category: 'DevOps',
        proficiency: 'Intermediate',
        icon: '🐳',
        description: 'Containerization and deployment'
      },
      {
        name: 'Vercel',
        category: 'DevOps',
        proficiency: 'Advanced',
        icon: '▲',
        description: 'Deployment and hosting platform'
      },
      {
        name: 'VS Code',
        category: 'DevOps',
        proficiency: 'Advanced',
        icon: '💻',
        description: 'Code editor with extensions and debugging'
      }
    ]
  },
  {
    name: 'AI & Integration',
    description: 'Artificial Intelligence integration and third-party APIs',
    skills: [
      {
        name: 'OpenAI API',
        category: 'AI',
        proficiency: 'Intermediate',
        icon: '🤖',
        description: 'AI integration for content generation and analysis'
      },
      {
        name: 'API Integration',
        category: 'AI',
        proficiency: 'Advanced',
        icon: '🔗',
        description: 'Integrating third-party services and APIs'
      },
      {
        name: 'Kafka',
        category: 'AI',
        proficiency: 'Beginner',
        icon: '📊',
        description: 'Real-time data streaming and processing'
      }
    ]
  },
  {
    name: 'Design & UX',
    description: 'User experience design and visual design principles',
    skills: [
      {
        name: 'Responsive Design',
        category: 'Design',
        proficiency: 'Expert',
        icon: '📱',
        description: 'Creating adaptive layouts for all devices'
      },
      {
        name: 'UI/UX Design',
        category: 'Design',
        proficiency: 'Intermediate',
        icon: '🎨',
        description: 'User interface and experience design principles'
      },
      {
        name: 'Framer Motion',
        category: 'Design',
        proficiency: 'Advanced',
        icon: '✨',
        description: 'Animation library for React applications'
      },
      {
        name: 'Accessibility',
        category: 'Design',
        proficiency: 'Intermediate',
        icon: '♿',
        description: 'Web accessibility standards and implementation'
      }
    ]
  },
  {
    name: 'Testing & Quality',
    description: 'Testing methodologies and code quality assurance',
    skills: [
      {
        name: 'Jest',
        category: 'Testing',
        proficiency: 'Intermediate',
        icon: '🧪',
        description: 'JavaScript testing framework'
      },
      {
        name: 'Code Review',
        category: 'Testing',
        proficiency: 'Advanced',
        icon: '👀',
        description: 'Peer code review and quality assurance'
      },
      {
        name: 'Performance Optimization',
        category: 'Testing',
        proficiency: 'Intermediate',
        icon: '⚡',
        description: 'Optimizing application performance and load times'
      }
    ]
  }
]

export const getSkillsByCategory = (category: string): Skill[] => {
  const skillCategory = skillsData.find(cat => cat.name === category)
  return skillCategory ? skillCategory.skills : []
}

export const getAllSkills = (): Skill[] => {
  return skillsData.flatMap(category => category.skills)
}

export const getSkillsByProficiency = (proficiency: Skill['proficiency']): Skill[] => {
  return getAllSkills().filter(skill => skill.proficiency === proficiency)
} 