
import { Lightbulb } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-16">
      <div className="neumorph p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="btn-neumorph w-16 h-16 rounded-full flex items-center justify-center mb-2 text-primary shrink-0">
            <Lightbulb size={32} />
          </div>
          
          <div className="text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">What is AI-Lens?</h2>
            
            <p className="text-muted-foreground mb-4">
              <strong>AI-Lens</strong> is a daily-updated aggregator for the latest advancements in 
              Artificial Intelligence. It brings together AI news, research, and podcasts from trusted sources 
              across domains like Machine Learning, Computer Vision, Natural Language Processing, and 
              Reinforcement Learning — all in one place.
            </p>
            
            <p className="text-muted-foreground">
              Users can browse trending content, explore categories, and save their favorite articles 
              or podcast episodes for later.
            </p>
          </div>
        </div>
        
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-r from-accent/10 to-primary/10 blur-3xl"></div>
      </div>
    </section>
  );
}
