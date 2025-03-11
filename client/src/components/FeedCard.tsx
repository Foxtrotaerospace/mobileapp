import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { SpaceContent } from "@shared/schema";

interface FeedCardProps {
  content: SpaceContent;
}

export default function FeedCard({ content }: FeedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full mb-4"
    >
      <Card className="overflow-hidden bg-card">
        <CardContent className="p-0">
          <img
            src={content.imageUrl}
            alt={content.title}
            className="w-full aspect-square object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{content.title}</h3>
            <p className="text-muted-foreground">{content.description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
