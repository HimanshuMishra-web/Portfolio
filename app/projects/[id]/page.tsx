'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Github, ExternalLink, Calendar, Clock, Users, Code, Globe, Image as ImageIcon } from 'lucide-react'
import ImageCarousel from '../../components/ImageCarousel'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

import { projectsData } from '../../../data'

export default function ProjectDetails() {
  const params = useParams()
  const router = useRouter()
  const projectId = parseInt(params.id as string)
  const [showCarousel, setShowCarousel] = useState(false)
  
  const project = projectsData.find(p => p.id === projectId)

  if (!project) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Project not found
          </h1>
          <Link href="/projects" className="btn-primary">
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Back Button */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="container-max">
          <motion.button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 mb-8"
            whileHover={{ x: -5 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Projects</span>
          </motion.button>
        </div>
      </div>

      {/* Project Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center space-x-4 mb-4">
              <span className="px-3 py-1 text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-3 py-1 text-sm font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full">
                  Featured
                </span>
              )}
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {project.title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl">
              {project.description}
            </p>

            {/* Project Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{project.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{project.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>{project.teamSize}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Screenshots */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Project Screenshots
              </h2>
              <motion.button
                onClick={() => setShowCarousel(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ImageIcon className="w-4 h-4" />
                <span>View All Screenshots</span>
              </motion.button>
            </div>
            
                         {/* Screenshot Preview Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {project.screenshots.slice(0, 6).map((screenshot, index) => (
                 <motion.div
                   key={index}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: 0.1 * index }}
                   className="relative aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-all duration-300"
                   onClick={() => setShowCarousel(true)}
                 >
                   <img
                     src={screenshot}
                     alt={`${project.title} screenshot ${index + 1}`}
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                   />
                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
                     <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                       <ImageIcon className="w-8 h-8 text-white" />
                     </div>
                   </div>
                   <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                     {index + 1}
                   </div>
                 </motion.div>
               ))}
             </div>
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  About This Project
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {project.longDescription}
                  </p>
                </div>

                {/* Challenges & Solutions */}
                <div className="mt-12">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Key Challenges & Solutions
                  </h3>
                  <div className="space-y-6">
                    {project.challenges.map((challenge, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Challenge {index + 1}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">
                          {challenge}
                        </p>
                        <h5 className="font-medium text-primary-600 dark:text-primary-400 mb-2">
                          Solution
                        </h5>
                        <p className="text-gray-600 dark:text-gray-300">
                          {project.solutions[index]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-8"
              >
                                 {/* Technologies */}
                 <div className="card p-6">
                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                     Technologies Used
                   </h3>
                   <div className="flex flex-wrap gap-2">
                     {project.technologies.map((tech) => (
                       <span
                         key={tech}
                         className="px-3 py-1 text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full"
                       >
                         {tech}
                       </span>
                     ))}
                   </div>
                 </div>

                                 {/* Project Links */}
                 <div className="card p-6">
                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                     Project Links
                   </h3>
                   <div className="space-y-3">
                     <a
                       href={project.githubUrl}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                     >
                       <Github className="w-5 h-5" />
                       <span className="text-gray-700 dark:text-gray-300">View Code</span>
                     </a>
                     <a
                       href={project.liveUrl}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                     >
                       <ExternalLink className="w-5 h-5" />
                       <span className="text-gray-700 dark:text-gray-300">Live Demo</span>
                     </a>
                   </div>
                 </div>

                                 {/* Project Stats */}
                 <div className="card p-6">
                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                     Project Details
                   </h3>
                   <div className="space-y-3">
                     <div className="flex justify-between">
                       <span className="text-gray-600 dark:text-gray-400">Category</span>
                       <span className="text-gray-900 dark:text-white font-medium">{project.category}</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-gray-600 dark:text-gray-400">Duration</span>
                       <span className="text-gray-900 dark:text-white font-medium">{project.duration}</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-gray-600 dark:text-gray-400">Team Size</span>
                       <span className="text-gray-900 dark:text-white font-medium">{project.teamSize}</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-gray-600 dark:text-gray-400">Year</span>
                       <span className="text-gray-900 dark:text-white font-medium">{project.date}</span>
                     </div>
                   </div>
                 </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Interested in Similar Projects?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              I'm always excited to work on new projects and bring innovative ideas to life. 
              Let's discuss your next project!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-primary text-lg px-8 py-3"
              >
                Start a Project
              </Link>
              <Link
                href="/projects"
                className="btn-secondary text-lg px-8 py-3"
              >
                View All Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Carousel Modal */}
      {showCarousel && (
        <ImageCarousel
          images={project.screenshots}
          title={project.title}
          onClose={() => setShowCarousel(false)}
        />
      )}
    </div>
  )
} 