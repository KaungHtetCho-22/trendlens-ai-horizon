
import { useState } from "react";
import { Bookmark, Play } from "lucide-react";

export type Podcast = {
  id: string;
  title: string;
  host: string;
  description: string;
  image: string;
  duration: string;
  date: string;
  audioUrl: string;
};

interface PodcastCardProps {
  podcast: Podcast;
  onPlay: (podcast: Podcast) => void;
}

export default function PodcastCard({ podcast, onPlay }: PodcastCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  
  const toggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };
  
  return (
    <div 
      className="neumorph overflow-hidden transition-all duration-300 hover:translate-y-[-4px] cursor-pointer"
      onClick={() => onPlay(podcast)}
    >
      <div className="relative aspect-square">
        <img 
          src={podcast.image} 
          alt={podcast.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <button className="bg-primary/90 rounded-full w-16 h-16 flex items-center justify-center">
            <Play size={32} fill="white" className="text-white ml-1" />
          </button>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between">
          <span className="text-xs text-muted-foreground">{podcast.duration}</span>
          <span className="text-xs text-muted-foreground">{podcast.date}</span>
        </div>
        
        <h3 className="font-bold text-lg mt-2 line-clamp-2">{podcast.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">by {podcast.host}</p>
        
        <p className="text-sm mt-3 text-muted-foreground line-clamp-2">
          {podcast.description}
        </p>
        
        <div className="mt-4 flex justify-between items-center">
          <button 
            className="btn-neumorph bg-primary text-primary-foreground px-4 py-2 flex items-center space-x-2"
            onClick={(e) => {
              e.stopPropagation();
              onPlay(podcast);
            }}
          >
            <Play size={16} />
            <span>Play</span>
          </button>
          
          <button
            onClick={toggleSave}
            className={`btn-neumorph w-9 h-9 flex items-center justify-center ${
              isSaved ? 'text-primary' : 'text-muted-foreground'
            }`}
            aria-label={isSaved ? "Unsave podcast" : "Save podcast"}
          >
            <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
}
