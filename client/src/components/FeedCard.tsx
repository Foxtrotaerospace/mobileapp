import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { SpaceContent } from "@shared/schema";

interface FeedCardProps {
  content: SpaceContent;
  isVisible: boolean;
}

export default function FeedCard({ content, isVisible }: FeedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-[100vh] snap-start snap-always"
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
            <p className="text-lg">{content.description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}