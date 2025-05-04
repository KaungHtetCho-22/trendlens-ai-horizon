
import { List, TrendingUp, UserPlus } from "lucide-react";

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Step = ({ icon, title, description }: StepProps) => (
  <div className="neumorph p-6 flex flex-col items-center text-center">
    <div className="btn-neumorph w-16 h-16 rounded-full flex items-center justify-center mb-4 text-primary">
      {icon}
    </div>
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default function HowItWorks() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          TrendLens makes it simple to stay on top of AI advancements and research
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Step 
          icon={<UserPlus size={32} />}
          title="Register an account"
          description="Create your free account to personalize your experience"
        />
        
        <Step 
          icon={<List size={32} />}
          title="Choose your interests"
          description="Select topics like ML, CV, NLP, or RL to customize your feed"
        />
        
        <Step 
          icon={<TrendingUp size={32} />}
          title="Get daily trending AI insights"
          description="Receive curated articles and podcasts based on your preferences"
        />
      </div>
    </section>
  );
}
