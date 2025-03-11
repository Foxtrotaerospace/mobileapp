import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import FeedCard from "@/components/FeedCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { SpaceContent } from "@shared/schema";

export default function Feed() {
  const { data: content, isLoading } = useQuery<SpaceContent[]>({ 
    queryKey: ["/api/content"]
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!content) return;

      // Calculate which card is most visible based on scroll position
      const viewportHeight = window.innerHeight;
      const scrollPosition = container.scrollTop;
      const newIndex = Math.round(scrollPosition / viewportHeight);

      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < content.length) {
        setCurrentIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [content, currentIndex]);

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-4rem)] px-4">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  if (!content?.length) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <p className="text-muted-foreground">No content available</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="h-[calc(100vh-4rem)] overflow-y-auto snap-y snap-mandatory scrollbar-hide"
    >
      <AnimatePresence initial={false}>
        {content.map((item, index) => (
          <FeedCard 
            key={item.id} 
            content={item}
            isVisible={index === currentIndex}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}