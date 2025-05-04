
import { useState, useRef, useEffect } from "react";
import ArticleCard, { Article } from "./ArticleCard";
import { Loader, AlertCircle } from "lucide-react";

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
    // Use a unique ID by combining the index and a timestamp to avoid key conflicts
    const uniqueId = `${i}-${Date.now()}`;
    result.push({
      ...articles[index],
      id: uniqueId,
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
  dateRange?: string;
  sortBy?: string;
}

export default function NewsFeed({ 
  category,
  dateRange = "this-week",
  sortBy = "newest"
}: NewsFeedProps) {
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset state when category or filters change
    setError(null);
    setIsLoading(true);
    setDisplayedArticles([]);
    
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      try {
        let filtered = [...articles];
        
        if (category) {
          filtered = filtered.filter(article => 
            article.category.toLowerCase() === category.toLowerCase()
          );
        }
        
        // Apply sorting based on sortBy parameter
        if (sortBy === "oldest") {
          filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        } else if (sortBy === "newest") {
          filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } else if (sortBy === "most-viewed") {
          // For this mock, we'll just randomize to simulate view count sorting
          filtered.sort(() => Math.random() - 0.5);
        }
        
        // Apply date filtering based on dateRange parameter
        if (dateRange !== "all") {
          const now = new Date();
          let startDate: Date;
          
          switch (dateRange) {
            case "this-week":
              startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
              break;
            case "this-month":
              startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
              break;
            case "this-year":
              startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
              break;
            default:
              startDate = new Date(0); // Beginning of time
          }
          
          filtered = filtered.filter(article => new Date(article.date) >= startDate);
        }
        
        if (filtered.length === 0) {
          setDisplayedArticles([]);
        } else {
          setDisplayedArticles(filtered);
        }
        
        setPage(1);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load articles. Please try again later.");
        setIsLoading(false);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [category, dateRange, sortBy]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoading && !error) {
          loadMoreArticles();
        }
      },
      { threshold: 0.5 }
    );
    
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    
    return () => observer.disconnect();
  }, [isLoading, category, error, dateRange, sortBy]);
  
  const loadMoreArticles = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        let newArticles = generateMoreArticles(displayedArticles.length, 6);
        
        if (category) {
          newArticles = newArticles.filter(
            article => article.category.toLowerCase() === category.toLowerCase()
          );
        }
        
        // Apply sorting based on sortBy parameter
        if (sortBy === "oldest") {
          newArticles.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        } else if (sortBy === "newest") {
          newArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } else if (sortBy === "most-viewed") {
          // For this mock, we'll just randomize to simulate view count sorting
          newArticles.sort(() => Math.random() - 0.5);
        }
        
        setDisplayedArticles(prev => [...prev, ...newArticles]);
        setPage(prev => prev + 1);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load more articles. Please try again later.");
        setIsLoading(false);
      }
    }, 1000);
  };
  
  if (error && displayedArticles.length === 0) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-display font-bold mb-6">Latest Articles</h2>
        <div className="neumorph p-8 text-center">
          <AlertCircle className="mx-auto mb-4 text-red-500" size={32} />
          <p className="text-lg text-muted-foreground">{error}</p>
          <button 
            className="mt-4 btn-neumorph px-4 py-2 text-primary"
            onClick={() => {
              setError(null);
              setIsLoading(true);
              // Re-attempt loading
              setTimeout(() => {
                if (category) {
                  setDisplayedArticles(articles.filter(
                    article => article.category.toLowerCase() === category.toLowerCase()
                  ));
                } else {
                  setDisplayedArticles(articles);
                }
                setIsLoading(false);
              }, 1000);
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-display font-bold mb-6">Latest Articles</h2>
      
      {isLoading && displayedArticles.length === 0 ? (
        <div className="neumorph p-12 flex justify-center items-center">
          <Loader size={32} className="animate-spin text-primary" />
          <p className="ml-4 text-lg text-muted-foreground">Loading articles...</p>
        </div>
      ) : displayedArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayedArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="neumorph p-8 text-center">
          <p className="text-lg text-muted-foreground">No articles found for this category.</p>
        </div>
      )}
      
      <div 
        ref={loaderRef} 
        className="py-8 flex justify-center items-center"
      >
        {isLoading && displayedArticles.length > 0 && (
          <div className="flex flex-col items-center space-y-2">
            <Loader size={24} className="animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading more articles...</p>
          </div>
        )}
      </div>
    </div>
  );
}
