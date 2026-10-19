import { fetchGoogleTrends, filterTopicsByKeywords } from './googleTrends';
import { generateBlogContent, generateSlug, BlogContentSections } from './openai';
import dbConnect from './mongodb';
import Topic from '../models/Topic';
import BlogTemplate from '../models/BlogTemplate';
import Blog from '../models/Blog';

export interface BlogGenerationResult {
  success: boolean;
  blog?: any;
  error?: string;
}

/**
 * Main function to generate blogs based on trending topics
 * @param geo - Geographic location for Google Trends (default: 'US')
 * @param customPrompt - Optional custom prompt for AI content generation
 * @returns Array of blog generation results
 */
export async function generateBlogsFromTrends(
  geo: string = 'US',
  customPrompt?: string
): Promise<BlogGenerationResult[]> {
  try {
    await dbConnect();

    // Fetch trending topics
    const trendingTopics = await fetchGoogleTrends(geo);

    // Get active topics from database
    const activeTopics = await Topic.find({ isActive: true });
    const topicKeywords = activeTopics
      .map(topic => topic.googleTrendsKeyword || topic.name)
      .filter(Boolean);

    // Filter trending topics that match our keywords
    const matchingTopics = filterTopicsByKeywords(trendingTopics, topicKeywords);

    const results: BlogGenerationResult[] = [];

    for (const trendingTopic of matchingTopics) {
      try {
        const result = await generateBlogForTopic(trendingTopic, customPrompt);
        results.push(result);
      } catch (error) {
        console.error(`Error generating blog for topic "${trendingTopic.title}":`, error);
        results.push({
          success: false,
          error: `Failed to generate blog for ${trendingTopic.title}`
        });
      }
    }

    return results;
  } catch (error) {
    console.error('Error in blog generation process:', error);
    return [{
      success: false,
      error: 'Failed to generate blogs from trends'
    }];
  }
}

/**
 * Generates a single blog for a specific trending topic
 * @param trendingTopic - The trending topic to generate content for
 * @param customPrompt - Optional custom prompt for AI generation
 * @returns Blog generation result
 */
async function generateBlogForTopic(
  trendingTopic: any,
  customPrompt?: string
): Promise<BlogGenerationResult> {
  try {
    // Find matching topic in database
    const topic = await findMatchingTopic(trendingTopic.title);
    if (!topic) {
      return {
        success: false,
        error: `No matching topic found for "${trendingTopic.title}"`
      };
    }

    // Find suitable template for this topic
    const template = await findTemplateForTopic(topic._id);
    if (!template) {
      return {
        success: false,
        error: `No template found for topic "${topic.name}"`
      };
    }

    // Generate content using OpenAI
    const contentSections = await generateBlogContent(
      trendingTopic.title,
      customPrompt
    );

    // Create slug and check for uniqueness
    let slug = generateSlug(contentSections.title);
    let counter = 1;
    while (await Blog.findOne({ slug })) {
      slug = `${generateSlug(contentSections.title)}-${counter}`;
      counter++;
    }

    // Fill template with generated content
    const filledJsonContent = fillTemplateWithContent(template.jsonStructure, contentSections);

    // Render HTML from JSON (simplified - in production you'd use a proper renderer)
    const renderedHtml = renderJsonToHtml(filledJsonContent);

    // Create blog document
    const blog = new Blog({
      title: contentSections.title,
      slug,
      jsonContent: filledJsonContent,
      renderedHtml,
      excerpt: contentSections.excerpt || contentSections.introduction,
      topics: [topic._id],
      templateUsed: template._id,
      status: 'pending_approval',
      seoTitle: contentSections.seoTitle,
      seoDescription: contentSections.seoDescription,
    });

    await blog.save();

    return {
      success: true,
      blog: {
        id: blog._id,
        title: blog.title,
        slug: blog.slug,
        status: blog.status,
        generatedAt: blog.generatedAt
      }
    };
  } catch (error) {
    console.error('Error generating blog for topic:', error);
    return {
      success: false,
      error: 'Internal error during blog generation'
    };
  }
}

/**
 * Finds the best matching topic from database for a trending topic
 * @param trendingTopicTitle - Title of the trending topic
 * @returns Matching topic document or null
 */
async function findMatchingTopic(trendingTopicTitle: string) {
  const activeTopics = await Topic.find({ isActive: true });

  // Simple matching - check if trending topic contains topic keywords
  for (const topic of activeTopics) {
    const keywords = [
      topic.name.toLowerCase(),
      topic.googleTrendsKeyword?.toLowerCase()
    ].filter(Boolean);

    if (keywords.some(keyword =>
      trendingTopicTitle.toLowerCase().includes(keyword!)
    )) {
      return topic;
    }
  }

  return null;
}

/**
 * Finds a suitable template for a given topic
 * @param topicId - Topic ID to find template for
 * @returns Template document or null
 */
async function findTemplateForTopic(topicId: any) {
  return await BlogTemplate.findOne({
    associatedTopics: topicId
  }).sort({ createdAt: -1 }); // Get most recent template
}

/**
 * Fills a JSON template with generated content
 * @param templateJson - The template JSON structure
 * @param content - Generated content sections
 * @returns Filled JSON content
 */
function fillTemplateWithContent(templateJson: any, content: BlogContentSections): any {
  // Deep clone the template
  const filledContent = JSON.parse(JSON.stringify(templateJson));

  // Recursively replace placeholders
  function replacePlaceholders(obj: any): any {
    if (typeof obj === 'string') {
      return obj
        .replace(/\{\{title\}\}/g, content.title)
        .replace(/\{\{introduction\}\}/g, content.introduction)
        .replace(/\{\{mainContent\}\}/g, content.mainContent)
        .replace(/\{\{conclusion\}\}/g, content.conclusion)
        .replace(/\{\{callToAction\}\}/g, content.callToAction || '')
        .replace(/\{\{excerpt\}\}/g, content.excerpt || '');
    } else if (Array.isArray(obj)) {
      return obj.map(replacePlaceholders);
    } else if (typeof obj === 'object' && obj !== null) {
      const newObj: any = {};
      for (const key in obj) {
        newObj[key] = replacePlaceholders(obj[key]);
      }
      return newObj;
    }
    return obj;
  }

  return replacePlaceholders(filledContent);
}

/**
 * Renders JSON content to HTML (simplified version)
 * @param jsonContent - Filled JSON content
 * @returns HTML string
 */
function renderJsonToHtml(jsonContent: any): string {
  // This is a very basic renderer - in production, you'd use a proper JSON-to-HTML renderer
  // or integrate with GrapesJS's rendering capabilities

  let html = '';

  if (jsonContent.components && Array.isArray(jsonContent.components)) {
    for (const component of jsonContent.components) {
      switch (component.type) {
        case 'header':
          html += `<h1>${component.content || ''}</h1>`;
          break;
        case 'text':
          html += `<p>${component.content || ''}</p>`;
          break;
        case 'image':
          html += `<img src="${component.src || ''}" alt="${component.alt || ''}" />`;
          break;
        default:
          html += `<div>${component.content || ''}</div>`;
      }
    }
  }

  return html || '<p>Content rendering not yet implemented</p>';
}