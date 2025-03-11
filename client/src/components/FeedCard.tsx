import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";
import type { SpaceContent } from "@shared/schema";

interface FeedCardProps {
  content: SpaceContent;
  isVisible: boolean;
}

export default function FeedCard({ content, isVisible }: FeedCardProps) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    setLiked(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-[calc(100vh-4rem)] snap-start snap-always"
    >
      <Card className="h-full overflow-hidden bg-card">
        <CardContent className="relative h-full p-0">
          <img
            src={content.imageUrl}
            alt={content.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
            <h3 className="text-2xl font-bold mb-2">{content.title}</h3>
            <p className="text-lg mb-4">{content.description}</p>
            <div className="flex gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 transition-colors ${
                  liked ? 'text-primary' : 'text-white'
                }`}
              >
                <ThumbsUp className="w-6 h-6" />
              </button>
              <button
                onClick={handleDislike}
                className={`flex items-center gap-2 transition-colors ${
                  disliked ? 'text-red-500' : 'text-white'
                }`}
              >
                <ThumbsDown className="w-6 h-6" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}