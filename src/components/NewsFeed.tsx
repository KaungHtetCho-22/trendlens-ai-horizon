
import { useState, useRef, useEffect } from "react";
import ArticleCard, { Article } from "./ArticleCard";
import { Loader, AlertCircle } from "lucide-react";
import { fetchAllArticles, categorizeArticle } from "@/utils/rssService";
import { useToast } from "@/hooks/use-toast";

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
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const articlesPerPage = 6;

  // Fetch articles on component mount
  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const articles = await fetchAllArticles();
        
        // Categorize articles if needed
        const categorizedArticles = articles.map(categorizeArticle);
        
        if (categorizedArticles.length === 0) {
          setError("No articles found. Please try again later.");
        } else {
          setAllArticles(categorizedArticles);
          toast({
            title: "Articles loaded",
            description: `Successfully loaded ${categorizedArticles.length} articles`,
          });
        }
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles. Please try again later.");
        toast({
          title: "Error loading articles",
          description: "There was a problem fetching the latest articles",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [toast]);

  // Apply filters when category, dateRange, sortBy, or allArticles change
  useEffect(() => {
    setError(null);
    setDisplayedArticles([]);
    
    try {
      let filtered = [...allArticles];
      
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
        // For real implementation, this would need view count data
        // Here we'll just randomize to simulate
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
      
      // Set first page of results
      setDisplayedArticles(filtered.slice(0, articlesPerPage));
      setPage(1);
    } catch (err) {
      setError("Error filtering articles. Please try again.");
    }
  }, [category, dateRange, sortBy, allArticles]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoading && !error && allArticles.length > 0) {
          loadMoreArticles();
        }
      },
      { threshold: 0.5 }
    );
    
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    
    return () => observer.disconnect();
  }, [isLoading, allArticles, error, page, displayedArticles]);
  
  const loadMoreArticles = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      try {
        let filtered = [...allArticles];
        
        if (category) {
          filtered = filtered.filter(
            article => article.category.toLowerCase() === category.toLowerCase()
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
        
        const nextPage = page + 1;
        const startIdx = (nextPage - 1) * articlesPerPage;
        const endIdx = nextPage * articlesPerPage;
        const newArticles = filtered.slice(startIdx, endIdx);
        
        if (newArticles.length > 0) {
          setDisplayedArticles(prev => [...prev, ...newArticles]);
          setPage(nextPage);
        }
        
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load more articles. Please try again later.");
        setIsLoading(false);
      }
    }, 500);
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
              fetchAllArticles().then(articles => {
                const categorizedArticles = articles.map(categorizeArticle);
                setAllArticles(categorizedArticles);
                setIsLoading(false);
              }).catch(err => {
                console.error("Error re-fetching articles:", err);
                setError("Failed to load articles. Please try again later.");
                setIsLoading(false);
              });
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
