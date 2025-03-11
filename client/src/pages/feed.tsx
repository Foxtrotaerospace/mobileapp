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

  const [visibleItems, setVisibleItems] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && content && visibleItems < content.length) {
          // Add one more item when reaching the bottom
          setVisibleItems((prev) => Math.min(prev + 1, content?.length || 0));
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [content, visibleItems]);

  if (isLoading) {
    return (
      <div className="container px-4 py-8 space-y-4">
        <Skeleton className="w-full h-[400px]" />
      </div>
    );
  }

  return (
    <div className="container px-4 py-8">
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {content?.slice(0, visibleItems).map((item) => (
            <FeedCard key={item.id} content={item} />
          ))}
        </AnimatePresence>
      </div>
      {/* Intersection observer target */}
      <div 
        ref={containerRef} 
        className="h-20"
        aria-hidden="true"
      />
    </div>
  );
}