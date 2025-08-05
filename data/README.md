# Data Folder Structure

This folder contains all the static data for the portfolio website, organized into separate files for better maintainability and type safety.

## File Structure

```
data/
├── index.ts          # Main export file - exports all data
├── projects.ts       # Project data and interfaces
├── skills.ts         # Skills and expertise data
├── experience.ts     # Work experience and education
├── personal.ts       # Personal information and contact details
├── site.ts          # Site configuration and navigation
└── README.md        # This documentation file
```

## Data Files

### `projects.ts`
Contains all project-related data including:
- Project interfaces and types
- Complete project data with descriptions, technologies, challenges, and solutions
- Helper functions for filtering and sorting projects

**Usage:**
```typescript
import { projectsData, type Project } from '../data/projects'
```

### `skills.ts`
Contains skills and expertise information:
- Skills categorized by development areas
- Proficiency levels (Beginner, Intermediate, Advanced, Expert)
- Helper functions for filtering skills

**Usage:**
```typescript
import { skillsData, getSkillsByCategory } from '../data/skills'
```

### `experience.ts`
Contains work experience and education data:
- Work history with detailed responsibilities and achievements
- Education background and achievements
- Certifications
- Helper functions for sorting and filtering

**Usage:**
```typescript
import { experienceData, educationData, getCurrentExperience } from '../data/experience'
```

### `personal.ts`
Contains personal information and contact details:
- Personal bio and information
- Social media links
- Contact information
- Testimonials and statistics

**Usage:**
```typescript
import { personalInfo, socialLinks, contactInfo } from '../data/personal'
```

### `site.ts`
Contains site-wide configuration:
- Navigation items
- Site metadata and SEO information
- Theme configuration
- Form field definitions

**Usage:**
```typescript
import { siteConfig, navigationItems, seoData } from '../data/site'
```

## Main Export File

The `index.ts` file exports all data for easy importing:

```typescript
// Import all data
import { 
  projectsData, 
  skillsData, 
  experienceData, 
  personalInfo,
  siteConfig 
} from '../data'

// Import specific types
import { 
  type Project, 
  type Skill, 
  type Experience 
} from '../data'
```

## Type Safety

All data files include TypeScript interfaces for type safety:

- `Project` - Project data structure
- `Skill` - Skill information
- `Experience` - Work experience data
- `Education` - Education information
- `PersonalInfo` - Personal details
- `SiteConfig` - Site configuration

## Adding New Data

To add new data:

1. **For new projects**: Add to `projects.ts` following the existing structure
2. **For new skills**: Add to `skills.ts` in the appropriate category
3. **For new experience**: Add to `experience.ts` in chronological order
4. **For personal updates**: Modify `personal.ts` with new information
5. **For site changes**: Update `site.ts` with new configuration

## Data Structure Guidelines

- Keep data organized and well-documented
- Use consistent naming conventions
- Include TypeScript interfaces for all data structures
- Add helper functions for common data operations
- Maintain chronological order for experience and education
- Use descriptive and professional language

## Helper Functions

Each data file includes helper functions for common operations:

- `getSkillsByCategory()` - Filter skills by category
- `getCurrentExperience()` - Get current work experience
- `getSortedExperience()` - Get experience sorted by date
- `getSkillsByProficiency()` - Filter skills by proficiency level

## Best Practices

1. **Consistency**: Use consistent data formats across all files
2. **Maintainability**: Keep data organized and well-structured
3. **Type Safety**: Always use TypeScript interfaces
4. **Documentation**: Add comments for complex data structures
5. **Validation**: Ensure data is accurate and up-to-date
6. **Performance**: Use efficient data structures and helper functions 