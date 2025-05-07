
import ArticleCard, { Article } from "../ArticleCard";

interface ArticlesGridProps {
  articles: Article[];
}

export default function ArticlesGrid({ articles }: ArticlesGridProps) {
  if (articles.length === 0) {
    return (
      <div className="neumorph p-8 text-center">
        <p className="text-lg text-muted-foreground">No articles found for this category.</p>
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
