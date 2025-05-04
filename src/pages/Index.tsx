
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import DemoPreview from "../components/DemoPreview";
import AuthTabs from "../components/auth/AuthTabs";
import AboutSection from "../components/AboutSection";
import ContentSources from "../components/ContentSources";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <HeroSection />
      
      {/* About Section */}
      <AboutSection />
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Content Sources Section */}
      <ContentSources />
      
      {/* Demo Preview Section */}
      <DemoPreview />
      
      {/* Auth Section */}
      <section id="auth-section" className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Join AI-Lens Today</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Create an account to explore daily AI news, research, and podcasts across ML, CV, NLP, and RL — and save your favorites for later.
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <AuthTabs />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 mb-8">
        <div className="max-w-3xl mx-auto glass p-8 text-center">
          <h2 className="text-2xl font-bold mb-6">Start exploring the AI frontier today</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="btn-neumorph" asChild>
              <Link to="/topics/ml">Browse Topics</Link>
            </Button>
            
            <Button size="lg" variant="outline" asChild>
              <a href="#auth-section">Create Account</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
