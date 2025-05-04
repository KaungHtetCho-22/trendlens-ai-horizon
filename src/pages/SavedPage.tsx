
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArticleCard, { Article } from "../components/ArticleCard";
import PodcastCard, { Podcast } from "../components/PodcastCard";
import PodcastPlayer from "../components/PodcastPlayer";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock saved data
const savedArticles: Article[] = [
  {
    id: "5",
    title: "Machine Learning Algorithm Discovers Novel Antibiotics",
    excerpt: "Researchers use AI to identify a powerful new antibiotic candidate that works against previously untreatable bacterial strains.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "ML",
    date: "April 18, 2025",
    url: "#"
  },
  {
    id: "2",
    title: "Researchers Develop Self-Supervised Vision Model That Rivals Human Perception",
    excerpt: "A new computer vision system learns from unlabeled video and demonstrates remarkable accuracy in object detection and scene understanding tasks.",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1336&q=80",
    category: "CV",
    date: "April 28, 2025",
    url: "#",
  }
];

const savedPodcasts: Podcast[] = [
  {
    id: "pod2",
    title: "Ethical AI: Balancing Innovation and Responsibility",
    host: "Marcus Johnson & Dr. Leila Patel",
    description: "A deep dive into the ethical considerations surrounding artificial intelligence development. This episode examines bias in algorithms, privacy concerns, and the importance of responsible AI governance frameworks.",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    duration: "51:08",
    date: "April 29, 2025",
    audioUrl: "https://cdn.freesound.org/previews/612/612087_5674468-lq.mp3",
  }
];

const SavedPage = () => {
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  // Mock authentication check (in a real app, this would use a proper auth hook)
  useEffect(() => {
    // For demo purposes, we'll simulate a user not being logged in
    // In a real app, this would check the auth state from context or a hook
    setIsLoggedIn(false);
  }, []);
  
  const handlePlayPodcast = (podcast: Podcast) => {
    setCurrentPodcast(podcast);
  };
  
  const handleClosePodcast = () => {
    setCurrentPodcast(null);
  };
  
  const scrollToAuth = () => {
    const authSection = document.getElementById("auth-section");
    if (authSection) {
      authSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // If we're not on the home page, navigate to it first
      navigate('/#auth-section');
    }
  };
  
  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="neumorph p-12 text-center max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-5">Login Required</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Please log in to view your saved content.
          </p>
          <Button 
            size="lg"
            className="btn-neumorph flex items-center justify-center"
            onClick={scrollToAuth}
          >
            <LogIn size={18} className="mr-2" />
            Login to Continue
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="neumorph p-8 mb-8">
        <h1 className="text-3xl font-display font-bold mb-3">Your Saved Content</h1>
        <p className="text-muted-foreground">
          Access your favorite articles and podcasts in one place.
        </p>
      </div>
      
      <Tabs defaultValue="articles" className="mb-12">
        <TabsList className="neumorph mb-6 p-1">
          <TabsTrigger value="articles" className="px-8 py-2">Articles</TabsTrigger>
          <TabsTrigger value="podcasts" className="px-8 py-2">Podcasts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="articles">
          {savedArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 neumorph">
              <p className="text-lg text-muted-foreground">You haven't saved any articles yet.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="podcasts">
          {savedPodcasts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedPodcasts.map(podcast => (
                <PodcastCard 
                  key={podcast.id} 
                  podcast={podcast}
                  onPlay={handlePlayPodcast}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 neumorph">
              <p className="text-lg text-muted-foreground">You haven't saved any podcasts yet.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {currentPodcast && (
        <PodcastPlayer podcast={currentPodcast} onClose={handleClosePodcast} />
      )}
    </div>
  );
};

export default SavedPage;
