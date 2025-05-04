
import { useState } from "react";
import { Tag } from "lucide-react";

const trendingTags = [
  { name: "GPT-4", count: 127 },
  { name: "Llama3", count: 95 },
  { name: "Claude", count: 82 },
  { name: "AI Ethics", count: 76 },
  { name: "Vision Transformers", count: 58 },
  { name: "Stable Diffusion", count: 51 },
];

export default function TrendingTags() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  return (
    <div className="neumorph p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Tag size={18} className="text-primary" />
        <h3 className="text-lg font-bold">Trending Tags</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {trendingTags.map(tag => (
          <button
            key={tag.name}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedTag === tag.name
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80"
            }`}
            onClick={() => setSelectedTag(tag.name === selectedTag ? null : tag.name)}
          >
            {tag.name}
            <span className="ml-1 text-xs opacity-70">({tag.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
}
