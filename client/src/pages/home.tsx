import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container px-4 py-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
          Explore Space
        </h1>
        <p className="mt-4 text-muted-foreground">
          Your journey through the cosmos starts here. Discover amazing facts,
          stunning photos, and educational content about space.
        </p>
        
        <div className="grid grid-cols-2 gap-4 mt-8">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa"
            alt="Space"
            className="rounded-lg col-span-2 aspect-video object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1588132290195-32a0e5e17a6b"
            alt="Nebula"
            className="rounded-lg aspect-square object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1731725111274-abd0bb331ca6"
            alt="Galaxy"
            className="rounded-lg aspect-square object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}
