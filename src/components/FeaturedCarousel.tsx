
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ArticleCard, { Article } from "./ArticleCard";

// Mock data
const featuredArticles: Article[] = [
  {
    id: "1",
    title: "GPT-4 Sets New Benchmarks in AI Reasoning Capabilities",
    excerpt: "OpenAI's latest language model demonstrates unprecedented performance across multiple domains, including mathematics, coding, and creative writing.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "NLP",
    date: "May 2, 2025",
    url: "#",
    isFeatured: true
  },
  {
    id: "2",
    title: "Researchers Develop Self-Supervised Vision Model That Rivals Human Perception",
    excerpt: "A new computer vision system learns from unlabeled video and demonstrates remarkable accuracy in object detection and scene understanding tasks.",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1336&q=80",
    category: "CV",
    date: "April 28, 2025",
    url: "#",
    isFeatured: true
  },
  {
    id: "3",
    title: "Breakthrough in Reinforcement Learning Enables Robot Adaptability",
    excerpt: "A novel approach to reinforcement learning allows robots to adapt their behavior within minutes rather than requiring extensive retraining.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "RL",
    date: "April 25, 2025",
    url: "#",
    isFeatured: true
  },
  {
    id: "4",
    title: "AI Model Achieves Medical Diagnosis Accuracy Surpassing Human Specialists",
    excerpt: "A deep learning system demonstrates superior diagnostic performance across multiple medical imaging modalities, potentially revolutionizing healthcare.",
    image: "https://images.unsplash.com/photo-1576671081803-5dcb9836dc61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1398&q=80",
    category: "ML",
    date: "April 20, 2025",
    url: "#",
    isFeatured: true
  },
];

export default function FeaturedCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % featuredArticles.length);
  };
  
  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length);
  };
  
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);
  
  useEffect(() => {
    const interval = setInterval(goToNext, 8000);
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);
  
  return (
    <section className="mb-12 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-display font-bold">Featured</h2>
        <div className="flex space-x-2">
          <button
            onClick={goToPrev}
            className="btn-neumorph w-10 h-10 flex items-center justify-center"
            disabled={isAnimating}
            aria-label="Previous article"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={goToNext}
            className="btn-neumorph w-10 h-10 flex items-center justify-center"
            disabled={isAnimating}
            aria-label="Next article"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      
      <div className="overflow-hidden relative">
        <div 
          className={`transition-all duration-500 ease-in-out flex h-full`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {featuredArticles.map((article) => (
            <div key={article.id} className="min-w-full h-full">
              <ArticleCard article={article} isFeatured={true} />
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-4 space-x-2">
        {featuredArticles.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isAnimating) return;
              setIsAnimating(true);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex 
                ? "bg-primary w-6" 
                : "bg-secondary"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
