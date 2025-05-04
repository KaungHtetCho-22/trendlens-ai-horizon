
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

const suggestions = [
  "Artificial Intelligence",
  "Machine Learning",
  "Deep Learning",
  "Neural Networks",
  "Computer Vision",
  "Natural Language Processing",
  "Reinforcement Learning",
  "AI Ethics",
  "AI Applications",
  "AI Research",
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const filteredSuggestions = suggestions.filter(suggestion => 
    suggestion.toLowerCase().includes(query.toLowerCase())
  );
  
  useEffect(() => {
    setShowSuggestions(query.length > 0);
  }, [query]);
  
  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for AI topics..."
          className="neumorph-inset w-full p-4 pl-12 text-foreground"
        />
        <Search 
          size={20} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
        />
      </div>
      
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="glass absolute left-0 right-0 mt-2 p-2 z-10 max-h-60 overflow-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <li 
              key={index}
              className="p-2 hover:bg-secondary/50 rounded-lg cursor-pointer"
              onClick={() => {
                setQuery(suggestion);
                setShowSuggestions(false);
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
