import { useQuery } from "@tanstack/react-query";
import VideoCard from "@/components/VideoCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Video } from "@shared/schema";

export default function Learn() {
  const { data: videos, isLoading } = useQuery<Video[]>({
    queryKey: ["/api/videos"]
  });

  if (isLoading) {
    return (
      <div className="container px-4 py-8">
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="w-full h-[200px]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Educational Videos</h1>
      <div className="grid gap-6">
        {videos?.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
