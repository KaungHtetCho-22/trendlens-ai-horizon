
import { Badge } from "@/components/ui/badge";
import { Globe, Book, Podcast } from "lucide-react";

interface ContentSourceProps {
  name: string;
  type: "blog" | "research" | "podcast";
}

const SourceIcon = ({ type }: { type: "blog" | "research" | "podcast" }) => {
  switch (type) {
    case "blog":
      return <Globe size={16} className="mr-2" />;
    case "research":
      return <Book size={16} className="mr-2" />;
    case "podcast":
      return <Podcast size={16} className="mr-2" />;
  }
};

const ContentSourceBadge = ({ name, type }: ContentSourceProps) => (
  <div className="neumorph-inset p-4 flex items-center hover-scale">
    <SourceIcon type={type} />
    <span className="font-medium">{name}</span>
  </div>
);

export default function ContentSources() {
  const sources = [
    { name: "OpenAI Blog", type: "blog" as const },
    { name: "Hugging Face Blog", type: "blog" as const },
    { name: "DeepMind Blog", type: "blog" as const },
    { name: "MIT Technology Review", type: "blog" as const },
    { name: "Towards Data Science", type: "blog" as const },
    { name: "ArXiv", type: "research" as const },
    { name: "TWIML Podcast", type: "podcast" as const },
    { name: "Lex Fridman Podcast", type: "podcast" as const },
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Curated from Trusted Sources</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Daily updated content from the most respected voices in AI
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sources.map((source, index) => (
          <ContentSourceBadge key={index} name={source.name} type={source.type} />
        ))}
      </div>
    </section>
  );
}
