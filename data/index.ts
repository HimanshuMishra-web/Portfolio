// Export all data from individual files
export * from './projects'
export * from './skills'
export * from './experience'
export * from './personal'
export * from './site'

// Re-export commonly used data for convenience
export { projectsData, type Project } from './projects'
export { skillsData, type Skill, type SkillCategory } from './skills'
export { experienceData, educationData, type Experience, type Education } from './experience'
export { personalInfo, socialLinks, contactInfo, type PersonalInfo } from './personal'
export { siteConfig, navigationItems, type SiteConfig } from './site' 