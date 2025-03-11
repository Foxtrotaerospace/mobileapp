import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";
import type { Video } from "@shared/schema";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full aspect-video object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <PlayCircle className="w-12 h-12 text-white" />
            <span className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-sm">
              {formatDuration(video.duration)}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{video.title}</h3>
          <p className="text-muted-foreground text-sm mt-1">{video.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
