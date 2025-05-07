
import { Loader } from "lucide-react";
import { useEffect, useRef } from "react";

interface InfiniteScrollLoaderProps {
  onIntersect: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

export default function InfiniteScrollLoader({ 
  onIntersect, 
  isLoading,
  hasMore = true
}: InfiniteScrollLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoading && hasMore) {
          onIntersect();
        }
      },
      { threshold: 0.5 }
    );
    
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    
    return () => observer.disconnect();
  }, [isLoading, hasMore, onIntersect]);

  return (
    <div 
      ref={loaderRef} 
      className="py-8 flex justify-center items-center"
    >
      {isLoading && (
        <div className="flex flex-col items-center space-y-2">
          <Loader size={24} className="animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading more articles...</p>
        </div>
      )}
    </div>
  );
}
