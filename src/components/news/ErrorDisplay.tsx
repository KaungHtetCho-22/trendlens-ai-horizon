
import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
}

export default function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  return (
    <div className="neumorph p-8 text-center">
      <AlertCircle className="mx-auto mb-4 text-red-500" size={32} />
      <p className="text-lg text-muted-foreground">{error}</p>
      <button 
        className="mt-4 btn-neumorph px-4 py-2 text-primary"
        onClick={onRetry}
      >
        Try Again
      </button>
    </div>
  );
}
