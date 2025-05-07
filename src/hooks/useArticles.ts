
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Article } from "@/components/ArticleCard";
import { fetchAllArticles, categorizeArticle } from "@/utils/rssService";

interface UseArticlesProps {
  category?: string;
  dateRange?: string;
  sortBy?: string;
}

export function useArticles({ category, dateRange = "this-week", sortBy = "newest" }: UseArticlesProps) {
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
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

  return {
    displayedArticles,
    isLoading,
    error,
    loadMoreArticles
  };
}
