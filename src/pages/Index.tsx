
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import DemoPreview from "../components/DemoPreview";
import AuthTabs from "../components/auth/AuthTabs";

const Index = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <HeroSection />
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Demo Preview Section */}
      <DemoPreview />
      
      {/* Auth Section */}
      <section id="auth-section" className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Join TrendLens Today</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create an account to get personalized news and podcast recommendations
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <AuthTabs />
        </div>
      </section>
    </div>
  );
};

export default Index;
