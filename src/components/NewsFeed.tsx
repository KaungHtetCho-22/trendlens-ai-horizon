
import { useState, useRef, useEffect } from "react";
import ArticleCard, { Article } from "./ArticleCard";
import { Loader } from "lucide-react";

// Mock data
const articles: Article[] = [
  {
    id: "5",
    title: "Machine Learning Algorithm Discovers Novel Antibiotics",
    excerpt: "Researchers use AI to identify a powerful new antibiotic candidate that works against previously untreatable bacterial strains.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "ML",
    date: "April 18, 2025",
    url: "#"
  },
  {
    id: "6",
    title: "Neural Networks Can Now Learn From a Single Example",
    excerpt: "A breakthrough in one-shot learning enables AI systems to recognize objects after seeing just one training example.",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "NLP",
    date: "April 15, 2025",
    url: "#"
  },
  {
    id: "7",
    title: "First Fully Autonomous Urban Air Taxi Service Launches",
    excerpt: "AI-powered air taxis begin operations in Singapore, using computer vision and path planning algorithms to navigate urban environments safely.",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "CV",
    date: "April 12, 2025",
    url: "#"
  },
  {
    id: "8",
    title: "Open Source LLM Matches Commercial Models at 1/10th the Size",
    excerpt: "Researchers have developed a drastically more efficient language model architecture that achieves comparable results with far fewer parameters.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "NLP",
    date: "April 10, 2025",
    url: "#"
  },
  {
    id: "9",
    title: "AI Agent Demonstrates Human-Level Strategic Reasoning",
    excerpt: "A new reinforcement learning system consistently outperforms expert human players in complex diplomatic and negotiation games.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",
    category: "RL",
    date: "April 8, 2025",
    url: "#"
  },
  {
    id: "10",
    title: "Computer Vision System Achieves 99.9% Accuracy in Manufacturing Quality Control",
    excerpt: "An advanced visual inspection system detects defects that were previously impossible to identify, reducing waste and improving product quality.",
    image: "https://images.unsplash.com/photo-1581092921461-7384592f5989?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "CV",
    date: "April 5, 2025",
    url: "#"
  },
];

// Generate more mock articles for infinite scroll
const generateMoreArticles = (start: number, count: number): Article[] => {
  const result: Article[] = [];
  for (let i = start; i < start + count; i++) {
    const index = i % articles.length;
    result.push({
      ...articles[index],
      id: `${i}`,
      title: `${articles[index].title} ${Math.floor(i / articles.length) + 1}`,
      date: new Date(new Date(articles[index].date).getTime() - i * 86400000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    });
  }
  return result;
};

interface NewsFeedProps {
  category?: string;
}

export default function NewsFeed({ category }: NewsFeedProps) {
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>(articles);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If category is provided, filter articles
    if (category) {
      setDisplayedArticles(articles.filter(article => 
        article.category.toLowerCase() === category.toLowerCase()
      ));
      setPage(1);
    } else {
      setDisplayedArticles(articles);
      setPage(1);
    }
  }, [category]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoading) {
          loadMoreArticles();
        }
      },
      { threshold: 0.5 }
    );
    
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    
    return () => observer.disconnect();
  }, [isLoading, category]);
  
  const loadMoreArticles = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newArticles = generateMoreArticles(displayedArticles.length, 6);
      
      if (category) {
        const filtered = newArticles.filter(
          article => article.category.toLowerCase() === category.toLowerCase()
        );
        setDisplayedArticles(prev => [...prev, ...filtered]);
      } else {
        setDisplayedArticles(prev => [...prev, ...newArticles]);
      }
      
      setPage(prev => prev + 1);
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-display font-bold mb-6">Latest Articles</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedArticles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      
      <div 
        ref={loaderRef} 
        className="py-8 flex justify-center items-center"
      >
        {isLoading && (
          <div className="flex flex-col items-center space-y-2">
            <Loader size={24} className="animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading more articles...</p>
          </div>
        )}
      </div>
    </div>
  );
}
