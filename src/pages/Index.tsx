
import { useState } from "react";
import FeaturedCarousel from "../components/FeaturedCarousel";
import NewsFeed from "../components/NewsFeed";
import TrendingTags from "../components/TrendingTags";
import PodcastPlayer from "../components/PodcastPlayer";
import type { Podcast } from "../components/PodcastCard";

// Example podcast data for quick preview
const samplePodcast: Podcast = {
  id: "pod1",
  title: "The Future of AI: Trends and Predictions",
  host: "Dr. Sarah Chen",
  description: "In this episode, we explore the most exciting developments in artificial intelligence and make predictions about where the field is heading in the next decade. From language models to computer vision and robotics, we cover the breakthroughs that are reshaping our world. Dr. Sarah Chen interviews leading experts from academia and industry to get their insights on the future of AI technology and its impact on society.",
  image: "https://images.unsplash.com/photo-1589254065909-b7086229d08c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  duration: "43:21",
  date: "May 3, 2025",
  audioUrl: "https://cdn.freesound.org/previews/612/612092_5674468-lq.mp3", // Sample audio from freesound
};

const Index = () => {
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);

  const handlePlayPodcast = (podcast: Podcast) => {
    setCurrentPodcast(podcast);
  };

  const handleClosePodcast = () => {
    setCurrentPodcast(null);
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <FeaturedCarousel />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
        <div className="lg:col-span-3">
          <NewsFeed />
        </div>
        
        <div className="lg:col-span-1">
          <TrendingTags />
          
          {/* Quick podcast preview */}
          <div className="mt-6 neumorph p-6">
            <h3 className="text-lg font-bold mb-4">Featured Podcast</h3>
            <div className="flex flex-col space-y-4">
              <img
                src={samplePodcast.image}
                alt={samplePodcast.title}
                className="w-full aspect-square object-cover rounded-lg"
              />
              <h4 className="font-bold">{samplePodcast.title}</h4>
              <p className="text-sm text-muted-foreground">by {samplePodcast.host}</p>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {samplePodcast.description}
              </p>
              <button
                className="btn-neumorph bg-primary text-primary-foreground py-2"
                onClick={() => handlePlayPodcast(samplePodcast)}
              >
                Listen Now
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {currentPodcast && (
        <PodcastPlayer podcast={currentPodcast} onClose={handleClosePodcast} />
      )}
    </div>
  );
};

export default Index;
