'use client'

import { motion } from 'framer-motion'
import { Code, Database, Globe, Smartphone, Server, Palette } from 'lucide-react'

export default function About() {
  const techStack = [
    {
      category: 'Frontend',
      icon: Globe,
      technologies: [
        { name: 'HTML', logo: '🌐' },
        { name: 'CSS', logo: '🎨' },
        { name: 'JavaScript', logo: '🟨' },
        { name: 'ReactJS', logo: '⚛️' },
        { name: 'TypeScript', logo: '🔷' },
        { name: 'MUI', logo: '📦' },
      ],
    },
    {
      category: 'State Management',
      icon: Server,
      technologies: [
        { name: 'Redux', logo: '🔄' },
        { name: 'React Query', logo: '📡' },
        { name: 'Formik', logo: '📝' },
        { name: 'Yup', logo: '✅' },
      ],
    },
    {
      category: 'Backend & Mobile',
      icon: Database,
      technologies: [
        { name: 'NodeJS', logo: '🟢' },
        { name: 'Express.JS', logo: '🚀' },
        { name: 'ElectronJS', logo: '💻' },
        { name: 'React Native', logo: '📱' },
      ],
    },
    {
      category: 'Database & Cloud',
      icon: Smartphone,
      technologies: [
        { name: 'GraphQL', logo: '📊' },
        { name: 'MongoDB', logo: '🍃' },
        { name: 'MySQL', logo: '🐬' },
        { name: 'Kafka', logo: '📨' },
      ],
    },
    {
      category: 'DevOps & Tools',
      icon: Code,
      technologies: [
        { name: 'Docker', logo: '🐳' },
        { name: 'AWS Lambda', logo: '☁️' },
        { name: 'Git', logo: '📚' },
        { name: 'VS Code', logo: '💙' },
      ],
    },
  ]

  const experiences = [
    {
      year: 'Jan 2024 - Present',
      title: 'Senior Full Stack Developer',
      company: 'Technosters Technologies OPC Pvt. Ltd.',
      description: 'Designed and deployed real-time trading analysis app, integrated Kafka for streaming, Dockerized deployment, led 3-member team, improved frontend load performance by 30%, created modular backend APIs.',
    },
    {
      year: 'Aug 2022 - Jan 2024',
      title: 'Full Stack Developer',
      company: 'Technosters Technologies OPC Pvt. Ltd.',
      description: 'Contributed to internal tool UI with responsive layouts, wrote modular REST APIs for MongoDB queries, participated in Agile ceremonies and contributed to documentation.',
    },
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About Me
            </h1>
            <div className="w-24 h-1 bg-primary-600 dark:bg-primary-400 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              I'm a Frontend-focused Full Stack Developer from India with 3+ years of experience 
              building high-performance, scalable web applications. I specialize in React, Node.js, 
              and TypeScript, with a passion for clean UI/UX and impactful digital products.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square max-w-md mx-auto rounded-2xl bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 p-1">
                <div className="w-full h-full rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <div className="text-8xl text-primary-600 dark:text-primary-400 font-bold">
                    HM
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                My Journey
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  My journey in web development started during my college years when I built my first 
                  website. What began as curiosity quickly turned into a passion for creating digital 
                  experiences that solve real-world problems.
                </p>
                <p>
                  Over the years, I've had the opportunity to work with startups, agencies, and 
                  established companies, helping them build robust web applications and mobile solutions. 
                  I believe in writing clean, maintainable code and staying up-to-date with the latest 
                  technologies and best practices.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to 
                  open-source projects, or sharing knowledge with the developer community.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">6+</div>
                  <div className="text-gray-600 dark:text-gray-300">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">3+</div>
                  <div className="text-gray-600 dark:text-gray-300">Years Experience</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tech Stack
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Here are the tools and technologies I use to bring ideas to life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techStack.map((stack, index) => {
              const Icon = stack.icon
              return (
                <motion.div
                  key={stack.category}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-3">
                      <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {stack.category}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {stack.technologies.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                      >
                        <span className="text-lg">{tech.logo}</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Experience
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              My professional journey and the roles that shaped my expertise
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative mb-8 last:mb-0"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 flex-shrink-0">
                    <div className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium">
                      {exp.year}
                    </div>
                  </div>
                  <div className="md:w-3/4 card p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {exp.title}
                    </h3>
                    <h4 className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                      {exp.company}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}