
import ArticleCard, { Article } from "../ArticleCard";

interface ArticlesGridProps {
  articles: Article[];
  category?: string;
}

export default function ArticlesGrid({ articles, category }: ArticlesGridProps) {
  if (articles.length === 0) {
    return (
      <div className="neumorph p-8 text-center">
        <p className="text-lg text-muted-foreground">
          {category 
            ? `No articles found for ${category} category. We're working on adding more content!`
            : "No articles found. Please try different filters."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {articles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
