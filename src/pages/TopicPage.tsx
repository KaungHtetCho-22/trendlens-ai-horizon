
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsFeed from "../components/NewsFeed";
import TrendingTags from "../components/TrendingTags";

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

const TopicPage = () => {
  const { topic } = useParams<{ topic: string }>();
  const [topicInfo, setTopicInfo] = useState<{ title: string, description: string } | null>(null);
  
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
      <div className="neumorph p-8 mb-8">
        <h1 className="text-3xl font-display font-bold mb-3">{topicInfo.title}</h1>
        <p className="text-muted-foreground">{topicInfo.description}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <NewsFeed category={topic.toUpperCase()} />
        </div>
        
        <div className="lg:col-span-1">
          <TrendingTags />
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
