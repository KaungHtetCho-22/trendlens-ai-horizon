
import { useState } from "react";
import { useArticles } from "@/hooks/useArticles";
import { fetchAllArticles, categorizeArticle } from "@/utils/rssService";
import ArticleLoader from "./news/ArticleLoader";
import ErrorDisplay from "./news/ErrorDisplay";
import ArticlesGrid from "./news/ArticlesGrid";
import InfiniteScrollLoader from "./news/InfiniteScrollLoader";

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
  const { displayedArticles, isLoading, error, loadMoreArticles } = useArticles({
    category,
    dateRange,
    sortBy
  });

  const handleRetry = async () => {
    try {
      const articles = await fetchAllArticles();
      const categorizedArticles = articles.map(categorizeArticle);
      // The hook will handle the rest of the state updates
    } catch (err) {
      console.error("Error re-fetching articles:", err);
    }
  };
  
  if (error && displayedArticles.length === 0) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-display font-bold mb-6">Latest Articles</h2>
        <ErrorDisplay error={error} onRetry={handleRetry} />
      </div>
    );
  }
  
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-display font-bold mb-6">Latest Articles</h2>
      
      {isLoading && displayedArticles.length === 0 ? (
        <ArticleLoader />
      ) : (
        <ArticlesGrid articles={displayedArticles} />
      )}
      
      <InfiniteScrollLoader 
        onIntersect={loadMoreArticles}
        isLoading={isLoading && displayedArticles.length > 0}
        hasMore={true}
      />
    </div>
  );
}
