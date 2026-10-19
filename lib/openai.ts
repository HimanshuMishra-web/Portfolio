import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface BlogContentSections {
  title: string;
  introduction: string;
  mainContent: string;
  conclusion: string;
  callToAction?: string;
  seoTitle?: string;
  seoDescription?: string;
  excerpt?: string;
}

/**
 * Generates blog content using OpenAI GPT-4 based on a trending topic
 * @param topic - The trending topic to generate content about
 * @param customPrompt - Optional custom prompt to refine the content generation
 * @returns Generated blog content sections
 */
export async function generateBlogContent(
  topic: string,
  customPrompt?: string
): Promise<BlogContentSections> {
  try {
    const basePrompt = `Generate a comprehensive blog post about "${topic}". The blog should be informative, engaging, and optimized for SEO. Structure the content with:

1. A compelling title (max 60 characters for SEO)
2. An engaging introduction paragraph
3. Main content body with detailed information, examples, and insights
4. A strong conclusion that summarizes key points
5. A call-to-action encouraging readers to engage or learn more
6. SEO title (optimized for search engines)
7. SEO description (meta description, max 160 characters)
8. A brief excerpt (2-3 sentences for previews)

Make the content original, well-researched, and valuable to readers. Use a professional yet conversational tone.`;

    const fullPrompt = customPrompt
      ? `${basePrompt}\n\nAdditional requirements: ${customPrompt}`
      : basePrompt;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a professional content writer specializing in creating high-quality, SEO-optimized blog posts. You create original, valuable content that engages readers and performs well in search engines.'
        },
        {
          role: 'user',
          content: fullPrompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No content generated from OpenAI');
    }

    // Parse the response to extract sections
    return parseBlogContentResponse(response, topic);
  } catch (error) {
    console.error('Error generating blog content:', error);
    throw new Error('Failed to generate blog content');
  }
}

/**
 * Parses the OpenAI response into structured blog content sections
 * @param response - Raw response from OpenAI
 * @param topic - The original topic for fallback content
 * @returns Structured blog content
 */
function parseBlogContentResponse(response: string, topic: string): BlogContentSections {
  // This is a simple parser - in production, you might want to use a more robust parsing method
  const lines = response.split('\n').filter(line => line.trim());

  let title = '';
  let introduction = '';
  let mainContent = '';
  let conclusion = '';
  let callToAction = '';
  let seoTitle = '';
  let seoDescription = '';
  let excerpt = '';

  let currentSection = '';

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.toLowerCase().includes('title:') || trimmedLine.toLowerCase().startsWith('title')) {
      title = trimmedLine.replace(/title:/i, '').trim();
      currentSection = 'title';
    } else if (trimmedLine.toLowerCase().includes('introduction:') || trimmedLine.toLowerCase().startsWith('introduction')) {
      introduction = trimmedLine.replace(/introduction:/i, '').trim();
      currentSection = 'introduction';
    } else if (trimmedLine.toLowerCase().includes('main content:') || trimmedLine.toLowerCase().startsWith('main content')) {
      mainContent = trimmedLine.replace(/main content:/i, '').trim();
      currentSection = 'mainContent';
    } else if (trimmedLine.toLowerCase().includes('conclusion:') || trimmedLine.toLowerCase().startsWith('conclusion')) {
      conclusion = trimmedLine.replace(/conclusion:/i, '').trim();
      currentSection = 'conclusion';
    } else if (trimmedLine.toLowerCase().includes('call.*action:') || trimmedLine.toLowerCase().startsWith('call')) {
      callToAction = trimmedLine.replace(/call.*action:/i, '').trim();
      currentSection = 'callToAction';
    } else if (trimmedLine.toLowerCase().includes('seo title:') || trimmedLine.toLowerCase().startsWith('seo title')) {
      seoTitle = trimmedLine.replace(/seo title:/i, '').trim();
      currentSection = 'seoTitle';
    } else if (trimmedLine.toLowerCase().includes('seo description:') || trimmedLine.toLowerCase().startsWith('seo description')) {
      seoDescription = trimmedLine.replace(/seo description:/i, '').trim();
      currentSection = 'seoDescription';
    } else if (trimmedLine.toLowerCase().includes('excerpt:') || trimmedLine.toLowerCase().startsWith('excerpt')) {
      excerpt = trimmedLine.replace(/excerpt:/i, '').trim();
      currentSection = 'excerpt';
    } else {
      // Append to current section
      switch (currentSection) {
        case 'introduction':
          introduction += (introduction ? ' ' : '') + trimmedLine;
          break;
        case 'mainContent':
          mainContent += (mainContent ? ' ' : '') + trimmedLine;
          break;
        case 'conclusion':
          conclusion += (conclusion ? ' ' : '') + trimmedLine;
          break;
        case 'callToAction':
          callToAction += (callToAction ? ' ' : '') + trimmedLine;
          break;
        case 'seoDescription':
          seoDescription += (seoDescription ? ' ' : '') + trimmedLine;
          break;
        case 'excerpt':
          excerpt += (excerpt ? ' ' : '') + trimmedLine;
          break;
      }
    }
  }

  // Fallback values if parsing fails
  if (!title) title = `The Latest on ${topic}`;
  if (!introduction) introduction = `Discover the latest insights about ${topic} in this comprehensive guide.`;
  if (!mainContent) mainContent = `This section provides detailed information about ${topic}.`;
  if (!conclusion) conclusion = `In conclusion, ${topic} continues to evolve and impact various aspects of our lives.`;
  if (!excerpt) excerpt = introduction;

  return {
    title,
    introduction,
    mainContent,
    conclusion,
    callToAction,
    seoTitle: seoTitle || title,
    seoDescription: seoDescription || excerpt,
    excerpt
  };
}

/**
 * Generates a URL-friendly slug from a title
 * @param title - The blog title
 * @returns URL-friendly slug
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
    .substring(0, 100); // Limit length
}