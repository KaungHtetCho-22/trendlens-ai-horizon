
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NewsFeed from "../components/NewsFeed";
import FilterPanel from "../components/FilterPanel";

const topicMap: Record<string, { title: string, description: string }> = {
  ml: {
    title: "Machine Learning",
    description: "Latest news and breakthroughs in machine learning algorithms, techniques, and applications."
  },
  cv: {
    title: "Computer Vision",
    description: "Updates on computer vision research, image recognition, object detection, and visual AI systems."
  },
  nlp: {
    title: "Natural Language Processing",
    description: "Developments in NLP, language models, sentiment analysis, and text processing technologies."
  },
  rl: {
    title: "Reinforcement Learning",
    description: "Advances in reinforcement learning, robotics, game AI, and autonomous systems."
  }
};

// Convert the topicMap to an array for easy mapping in the UI
const topics = Object.entries(topicMap).map(([key, value]) => ({
  key,
  ...value
}));

const TopicPage = () => {
  const { topic } = useParams<{ topic: string }>();
  const [topicInfo, setTopicInfo] = useState<{ title: string, description: string } | null>(null);
  const [filters, setFilters] = useState({
    dateRange: "this-week",
    sortBy: "newest"
  });
  
  useEffect(() => {
    if (topic && topic in topicMap) {
      setTopicInfo(topicMap[topic]);
    } else {
      setTopicInfo(null);
    }
  }, [topic]);
  
  if (!topic || !topicInfo) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Topic not found</h1>
        <p>The requested topic does not exist.</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="neumorph p-6 md:p-8 mb-6">
        <h1 className="text-2xl md:text-3xl font-display font-bold mb-3">{topicInfo.title}</h1>
        <p className="text-muted-foreground">{topicInfo.description}</p>
      </div>
      
      {/* Improved tab navigation */}
      <div className="pb-4 md:pb-6 overflow-x-auto whitespace-nowrap md:flex md:justify-center">
        <div className="inline-flex rounded-lg neumorph p-1">
          {topics.map((t) => (
            <Link
              key={t.key}
              to={`/topics/${t.key}`}
              className={`px-4 py-2 min-w-[70px] text-center font-medium rounded-md transition-all ${
                topic === t.key
                  ? "bg-primary text-white shadow-inner"
                  : "hover:bg-secondary"
              }`}
            >
              {t.key.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
      
      {/* Mobile-only filter panel */}
      <FilterPanel 
        className="lg:hidden mb-6" 
        onFilterChange={(newFilters) => setFilters(newFilters)}
      />
      
      {/* Main content with improved responsive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <NewsFeed 
            category={topic.toUpperCase()} 
            dateRange={filters.dateRange}
            sortBy={filters.sortBy}
          />
        </div>
        
        <div className="lg:col-span-1">
          <FilterPanel 
            className="hidden lg:block" 
            onFilterChange={(newFilters) => setFilters(newFilters)}
          />
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
