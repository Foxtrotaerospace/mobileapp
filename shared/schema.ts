import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const spaceContent = pgTable("space_content", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  type: text("type", { enum: ["fact", "photo"] }).notNull(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  videoUrl: text("video_url").notNull(),
  duration: integer("duration").notNull(),
});

export const insertSpaceContentSchema = createInsertSchema(spaceContent).omit({ id: true });
export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertVideoSchema = createInsertSchema(videos).omit({ id: true });

export type SpaceContent = typeof spaceContent.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Video = typeof videos.$inferSelect;

export type InsertSpaceContent = z.infer<typeof insertSpaceContentSchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertVideo = z.infer<typeof insertVideoSchema>;
