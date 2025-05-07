
import { Article } from "@/components/ArticleCard";

interface RssSource {
  url: string;
  category: string;
  name: string;
}

// RSS feed sources
const RSS_SOURCES: RssSource[] = [
  {
    name: "OpenAI",
    url: "https://openai.com/blog/rss.xml",
    category: "ML"
  },
  {
    name: "Hugging Face",
    url: "https://huggingface.co/blog/feed.xml",
    category: "ML"
  },
  {
    name: "DeepMind",
    url: "https://deepmind.com/blog/feed/basic/",
    category: "ML"
  },
  {
    name: "MIT Technology Review",
    url: "https://www.technologyreview.com/topic/artificial-intelligence/feed",
    category: "ML"
  },
  {
    name: "Towards Data Science",
    url: "https://towardsdatascience.com/feed",
    category: "ML"
  },
  {
    name: "ArXiv CS.CL",
    url: "https://export.arxiv.org/rss/cs.CL",
    category: "NLP"
  },
  {
    name: "TWIML",
    url: "https://twimlai.com/feed/",
    category: "Podcast"
  },
  {
    name: "Lex Fridman",
    url: "https://lexfridman.com/feed/podcast/",
    category: "Podcast"
  }
];

// Default image URLs by category
const DEFAULT_IMAGES: Record<string, string> = {
  ML: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  NLP: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  CV: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  RL: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  Podcast: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
};

// Use a CORS proxy to avoid CORS issues when fetching RSS feeds
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

/**
 * Extracts the first image URL from HTML content
 */
function extractImageFromHtml(content: string): string | null {
  const imgRegex = /<img[^>]+src="([^">]+)"/;
  const match = content.match(imgRegex);
  return match ? match[1] : null;
}

/**
 * Extracts a short excerpt from HTML content
 */
function extractExcerpt(content: string, maxLength: number = 150): string {
  // Remove all HTML tags
  const textOnly = content.replace(/<\/?[^>]+(>|$)/g, " ").trim();
  // Normalize whitespace
  const normalized = textOnly.replace(/\s+/g, " ");
  // Return truncated text
  return normalized.length > maxLength 
    ? normalized.substring(0, maxLength) + "..."
    : normalized;
}

/**
 * Format the date string to be human-readable
 */
function formatDateString(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

/**
 * Parse an RSS feed into an array of Article objects
 */
async function parseRssFeed(source: RssSource): Promise<Article[]> {
  try {
    // Try direct fetch first
    let response = await fetch(source.url);
    
    // If CORS error, try with proxy
    if (!response.ok && response.status === 0) {
      response = await fetch(`${CORS_PROXY}${source.url}`);
    }
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${source.name} RSS feed: ${response.statusText}`);
    }
    
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");
    
    // Check if it's RSS or Atom feed
    const isAtom = xmlDoc.querySelector('feed') !== null;
    
    let entries: Element[] = [];
    if (isAtom) {
      entries = Array.from(xmlDoc.querySelectorAll('entry'));
    } else {
      entries = Array.from(xmlDoc.querySelectorAll('item'));
    }
    
    return entries.map((item, index) => {
      // Common RSS/Atom elements
      const title = isAtom
        ? item.querySelector('title')?.textContent || `${source.name} Article`
        : item.querySelector('title')?.textContent || `${source.name} Article`;
      
      const link = isAtom
        ? item.querySelector('link')?.getAttribute('href') || '#'
        : item.querySelector('link')?.textContent || '#';
      
      const pubDate = isAtom
        ? item.querySelector('published')?.textContent || item.querySelector('updated')?.textContent || new Date().toISOString()
        : item.querySelector('pubDate')?.textContent || new Date().toISOString();
      
      // Content varies between feeds
      const content = isAtom
        ? item.querySelector('content')?.textContent || item.querySelector('summary')?.textContent || ''
        : item.querySelector('description')?.textContent || item.querySelector('content\\:encoded')?.textContent || '';
      
      // Extract image or fall back to default
      const imageUrl = extractImageFromHtml(content) || DEFAULT_IMAGES[source.category] || DEFAULT_IMAGES.ML;
      
      return {
        id: `${source.name}-${index}-${Date.now()}`,
        title,
        excerpt: extractExcerpt(content),
        image: imageUrl,
        category: source.category,
        date: formatDateString(pubDate),
        url: link
      };
    });
  } catch (error) {
    console.error(`Error parsing ${source.name} feed:`, error);
    return [];
  }
}

/**
 * Fetch articles from all RSS sources
 */
export async function fetchAllArticles(): Promise<Article[]> {
  try {
    // Fetch all feeds in parallel
    const promises = RSS_SOURCES.map(source => parseRssFeed(source));
    const results = await Promise.allSettled(promises);
    
    // Combine articles from all successfully fetched feeds
    const articles = results
      .filter((result): result is PromiseFulfilledResult<Article[]> => result.status === 'fulfilled')
      .flatMap(result => result.value);
    
    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

/**
 * Categorize an article based on its content
 */
export function categorizeArticle(article: Article): Article {
  // If article already has a category, return it
  if (article.category && article.category !== "") {
    return article;
  }
  
  // Default categorization logic based on title/content keywords
  const title = article.title.toLowerCase();
  const excerpt = article.excerpt.toLowerCase();
  
  if (title.includes('vision') || title.includes('image') || title.includes('camera') || excerpt.includes('computer vision')) {
    return { ...article, category: 'CV' };
  } else if (title.includes('language') || title.includes('nlp') || title.includes('text') || excerpt.includes('natural language')) {
    return { ...article, category: 'NLP' };
  } else if (title.includes('reinforcement') || title.includes('agent') || title.includes('rl') || excerpt.includes('reinforcement learning')) {
    return { ...article, category: 'RL' };
  } else {
    return { ...article, category: 'ML' };
  }
}
