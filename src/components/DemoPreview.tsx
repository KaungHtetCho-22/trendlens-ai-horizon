
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

export default function DemoPreview() {
  const demoArticles = [
    {
      title: "Advancements in Transformer Models for Multi-Modal Understanding",
      category: "ML",
      date: "May 3, 2025",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80"
    },
    {
      title: "Computer Vision Techniques for Autonomous Navigation Systems",
      category: "CV",
      date: "May 2, 2025",
      image: "https://images.unsplash.com/photo-1538006728155-ddb47add5b5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80"
    }
  ];

  const demoPodcast = {
    title: "The Next Wave of Deep Learning Architectures",
    host: "Dr. Sarah Chen & Dr. Michael Rodriguez",
    duration: "43:21",
    image: "https://images.unsplash.com/photo-1589254065909-b7086229d08c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  };

  return (
    <section className="py-16 relative">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Explore TrendLens Content</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get a preview of the personalized content available after signing up
        </p>
      </div>

      <div className="relative">
        {/* Blur overlay */}
        <div className="absolute inset-0 backdrop-blur-sm z-10 pointer-events-none"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Article previews */}
          {demoArticles.map((article, index) => (
            <div key={index} className="neumorph overflow-hidden group transition-all duration-300 cursor-pointer">
              <div className="relative aspect-video">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-0 left-0 m-3">
                  <Badge className="glass px-3 py-1">
                    {article.category}
                  </Badge>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-center text-xs text-muted-foreground mb-2">
                  <Calendar size={14} className="mr-1" />
                  <span>{article.date}</span>
                </div>
                
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
              </div>
            </div>
          ))}

          {/* Podcast preview */}
          <div className="neumorph overflow-hidden group transition-all duration-300 cursor-pointer">
            <div className="relative aspect-video">
              <img 
                src={demoPodcast.image} 
                alt={demoPodcast.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-0 left-0 m-3">
                <Badge variant="secondary" className="glass px-3 py-1">
                  <Headphones size={14} className="mr-1" />
                  Podcast
                </Badge>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex items-center text-xs text-muted-foreground mb-2">
                <span>{demoPodcast.duration}</span>
              </div>
              
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                {demoPodcast.title}
              </h3>
              
              <p className="text-sm text-muted-foreground">
                By {demoPodcast.host}
              </p>
            </div>
          </div>
        </div>

        {/* Center button */}
        <div className="text-center mt-12 relative z-20">
          <Link to="/topics/ml">
            <Button size="lg" className="btn-neumorph">
              Try Demo Feed <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
