
import { useState } from "react";
import PodcastCard, { Podcast } from "../components/PodcastCard";
import PodcastPlayer from "../components/PodcastPlayer";

// Mock podcast data
const podcasts: Podcast[] = [
  {
    id: "pod1",
    title: "The Future of AI: Trends and Predictions",
    host: "Dr. Sarah Chen",
    description: "In this episode, we explore the most exciting developments in artificial intelligence and make predictions about where the field is heading in the next decade. From language models to computer vision and robotics, we cover the breakthroughs that are reshaping our world. Dr. Sarah Chen interviews leading experts from academia and industry to get their insights on the future of AI technology and its impact on society.",
    image: "https://images.unsplash.com/photo-1589254065909-b7086229d08c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    duration: "43:21",
    date: "May 3, 2025",
    audioUrl: "https://cdn.freesound.org/previews/612/612092_5674468-lq.mp3",
  },
  {
    id: "pod2",
    title: "Ethical AI: Balancing Innovation and Responsibility",
    host: "Marcus Johnson & Dr. Leila Patel",
    description: "A deep dive into the ethical considerations surrounding artificial intelligence development. This episode examines bias in algorithms, privacy concerns, and the importance of responsible AI governance frameworks.",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    duration: "51:08",
    date: "April 29, 2025",
    audioUrl: "https://cdn.freesound.org/previews/612/612087_5674468-lq.mp3",
  },
  {
    id: "pod3",
    title: "Natural Language Processing Revolution",
    host: "Alex Rivera",
    description: "An exploration of the latest breakthroughs in NLP technology. From sentiment analysis to machine translation and conversational AI, we examine how these advances are changing the way we interact with computers and each other.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    duration: "37:45",
    date: "April 24, 2025",
    audioUrl: "https://cdn.freesound.org/previews/612/612091_5674468-lq.mp3",
  },
  {
    id: "pod4",
    title: "Computer Vision Systems in Healthcare",
    host: "Dr. Michael Chang",
    description: "A comprehensive look at how computer vision is revolutionizing healthcare diagnostics. From radiology to pathology and surgical assistance, AI-powered visual systems are improving accuracy and saving lives.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    duration: "48:32",
    date: "April 20, 2025",
    audioUrl: "https://cdn.freesound.org/previews/612/612093_5674468-lq.mp3",
  },
  {
    id: "pod5",
    title: "Reinforcement Learning: From Games to Real-World Applications",
    host: "Emma Wilson & Dr. Raj Patel",
    description: "This episode traces the evolution of reinforcement learning from game-playing AI to real-world applications in robotics, logistics, and energy management. We discuss the challenges of transferring lab success to practical deployment.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1506&q=80",
    duration: "55:19",
    date: "April 15, 2025",
    audioUrl: "https://cdn.freesound.org/previews/612/612089_5674468-lq.mp3",
  },
  {
    id: "pod6",
    title: "The Business Impact of Generative AI",
    host: "Sophie Martinez",
    description: "An analysis of how generative AI is transforming business operations, creative processes, and customer experiences. We interview business leaders who have successfully integrated these technologies into their operations.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    duration: "41:57",
    date: "April 10, 2025",
    audioUrl: "https://cdn.freesound.org/previews/612/612090_5674468-lq.mp3",
  },
];

const PodcastsPage = () => {
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);
  
  const handlePlayPodcast = (podcast: Podcast) => {
    setCurrentPodcast(podcast);
  };
  
  const handleClosePodcast = () => {
    setCurrentPodcast(null);
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="neumorph p-8 mb-8">
        <h1 className="text-3xl font-display font-bold mb-3">AI Podcasts</h1>
        <p className="text-muted-foreground">
          Explore the latest discussions, interviews, and insights on artificial intelligence, 
          machine learning, and the future of technology.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {podcasts.map(podcast => (
          <PodcastCard 
            key={podcast.id} 
            podcast={podcast}
            onPlay={handlePlayPodcast}
          />
        ))}
      </div>
      
      {currentPodcast && (
        <PodcastPlayer podcast={currentPodcast} onClose={handleClosePodcast} />
      )}
    </div>
  );
};

export default PodcastsPage;
