import { useQuery } from "@tanstack/react-query";
import FeedCard from "@/components/FeedCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { SpaceContent } from "@shared/schema";

export default function Feed() {
  const { data: content, isLoading } = useQuery<SpaceContent[]>({ 
    queryKey: ["/api/content"]
  });

  if (isLoading) {
    return (
      <div className="container px-4 py-8 space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="w-full h-[400px]" />
        ))}
      </div>
    );
  }

  return (
    <div className="container px-4 py-8">
      <div className="space-y-4">
        {content?.map((item) => (
          <FeedCard key={item.id} content={item} />
        ))}
      </div>
    </div>
  );
}
