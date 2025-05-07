
import { Loader } from "lucide-react";

interface ArticleLoaderProps {
  message?: string;
}

export default function ArticleLoader({ message = "Loading articles..." }: ArticleLoaderProps) {
  return (
    <div className="neumorph p-12 flex justify-center items-center">
      <Loader size={32} className="animate-spin text-primary" />
      <p className="ml-4 text-lg text-muted-foreground">{message}</p>
    </div>
  );
}
