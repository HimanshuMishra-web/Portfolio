import Parser from 'rss-parser';

const RSS_PARSER = new Parser();

export interface TrendingTopic {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  categories?: string[];
}

/**
 * Fetches trending topics from Google Trends RSS feed
 * @param geo - Geographic location (e.g., 'US', 'IN', 'GB')
 * @returns Array of trending topics
 */
export async function fetchGoogleTrends(geo: string = 'US'): Promise<TrendingTopic[]> {
  try {
    const rssUrl = `https://trends.google.com/trends/trendingsearches/daily/rss?geo=${geo}`;
    const feed = await RSS_PARSER.parseURL(rssUrl);

    const topics: TrendingTopic[] = feed.items?.map((item: any) => ({
      title: item.title || '',
      link: item.link || '',
      pubDate: item.pubDate || '',
      contentSnippet: item.contentSnippet,
      categories: item.categories
    })) || [];

    return topics;
  } catch (error) {
    console.error('Error fetching Google Trends:', error);
    throw new Error('Failed to fetch trending topics from Google Trends');
  }
}

/**
 * Filters trending topics based on predefined keywords/topics
 * @param topics - Array of trending topics
 * @param keywords - Array of keywords to match against
 * @returns Filtered array of matching topics
 */
export function filterTopicsByKeywords(
  topics: TrendingTopic[],
  keywords: string[]
): TrendingTopic[] {
  return topics.filter(topic => {
    const title = topic.title.toLowerCase();
    const snippet = topic.contentSnippet?.toLowerCase() || '';

    return keywords.some(keyword =>
      title.includes(keyword.toLowerCase()) ||
      snippet.includes(keyword.toLowerCase())
    );
  });
}

/**
 * Extracts keywords from topic titles and snippets
 * @param topics - Array of trending topics
 * @returns Array of unique keywords
 */
export function extractKeywordsFromTopics(topics: TrendingTopic[]): string[] {
  const keywords = new Set<string>();

  topics.forEach(topic => {
    // Extract words from title
    const titleWords = topic.title.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2);

    titleWords.forEach(word => keywords.add(word));

    // Extract words from content snippet if available
    if (topic.contentSnippet) {
      const snippetWords = topic.contentSnippet.toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 2);

      snippetWords.forEach(word => keywords.add(word));
    }
  });

  return Array.from(keywords);
}