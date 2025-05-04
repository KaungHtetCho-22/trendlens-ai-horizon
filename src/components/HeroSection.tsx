
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="py-12 md:py-24 text-center">
      <div className="relative w-28 h-28 mx-auto mb-8">
        <div className="w-28 h-28 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center">
          <div className="w-14 h-14 bg-white dark:bg-background rounded-full animate-lens-animation"></div>
        </div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-primary blur-xl opacity-30"></div>
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
        Your Lens into the <span className="text-primary">Future of AI</span>
      </h1>
      
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
        Curated machine learning news, podcasts, and research — tailored to your interests.
      </p>
      
      <div className="flex flex-wrap justify-center gap-4">
        <Button size="lg" className="btn-neumorph" asChild>
          <a href="#auth-section">Create Account</a>
        </Button>
        
        <Button size="lg" variant="outline" asChild>
          <Link to="/topics/ml">Try Demo</Link>
        </Button>
      </div>
    </section>
  );
}
