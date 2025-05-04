
import { useState } from "react";
import { Bookmark, Calendar, ExternalLink } from "lucide-react";

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  url: string;
  isFeatured?: boolean;
};

interface ArticleCardProps {
  article: Article;
  isFeatured?: boolean;
}

export default function ArticleCard({ article, isFeatured = false }: ArticleCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  
  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };
  
  return (
    <a 
      href={article.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`block group ${isFeatured ? 'h-full' : ''}`}
    >
      <article 
        className={`neumorph overflow-hidden transition-all duration-300 hover:translate-y-[-4px] relative h-full
                   ${isFeatured ? 'flex flex-col md:flex-row' : ''}`}
      >
        <div 
          className={`relative overflow-hidden ${isFeatured ? 'md:w-1/2 aspect-video md:aspect-auto' : 'aspect-video'}`}
        >
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-0 left-0 m-3">
            <span className="glass px-3 py-1 rounded-full text-xs font-bold">
              {article.category}
            </span>
          </div>
        </div>
        
        <div className={`p-5 flex flex-col ${isFeatured ? 'md:w-1/2' : ''}`}>
          <div className="flex items-center text-xs text-muted-foreground mb-2 space-x-2">
            <Calendar size={14} />
            <span>{article.date}</span>
          </div>
          
          <h3 className={`font-bold mb-2 group-hover:text-primary transition-colors 
                        ${isFeatured ? 'text-xl' : 'text-lg'}`}>
            {article.title}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-4 flex-grow">
            {article.excerpt}
          </p>
          
          <div className="flex justify-between items-center mt-auto">
            <span className="text-sm font-medium flex items-center gap-1 text-primary">
              Read more <ExternalLink size={14} />
            </span>
            
            <button
              onClick={toggleSave}
              className={`btn-neumorph w-9 h-9 flex items-center justify-center ${
                isSaved ? 'text-primary' : 'text-muted-foreground'
              }`}
              aria-label={isSaved ? "Unsave article" : "Save article"}
            >
              <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </article>
    </a>
  );
}
