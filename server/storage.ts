import { type SpaceContent, type Product, type Video, type InsertSpaceContent, type InsertProduct, type InsertVideo } from "@shared/schema";

export interface IStorage {
  // Space Content
  getAllContent(): Promise<SpaceContent[]>;
  getContentById(id: number): Promise<SpaceContent | undefined>;
  createContent(content: InsertSpaceContent): Promise<SpaceContent>;
  
  // Products
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Videos
  getAllVideos(): Promise<Video[]>;
  getVideoById(id: number): Promise<Video | undefined>;
  createVideo(video: InsertVideo): Promise<Video>;
}

export class MemStorage implements IStorage {
  private content: Map<number, SpaceContent>;
  private products: Map<number, Product>;
  private videos: Map<number, Video>;
  private currentContentId: number;
  private currentProductId: number;
  private currentVideoId: number;

  constructor() {
    this.content = new Map();
    this.products = new Map();
    this.videos = new Map();
    this.currentContentId = 1;
    this.currentProductId = 1;
    this.currentVideoId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Space content
    const spacePhotos = [
      { title: "Nebula Beauty", description: "A stunning nebula captured by the Hubble telescope", imageUrl: "https://images.unsplash.com/photo-1604765243044-03b86572dc85", type: "photo" },
      { title: "Galaxy Formation", description: "Spiral galaxy millions of light years away", imageUrl: "https://images.unsplash.com/photo-1504333638930-c8787321eee0", type: "photo" },
      { title: "Space Facts", description: "Did you know that one day on Venus is longer than its year?", imageUrl: "https://images.unsplash.com/photo-1534074398787-b8c0576baf73", type: "fact" },
    ];

    spacePhotos.forEach(content => {
      this.createContent(content);
    });

    // Products
    const spaceProducts = [
      { name: "Telescope Pro", description: "Professional grade telescope for astronomy enthusiasts", price: 599, imageUrl: "https://images.unsplash.com/photo-1446776709462-d6b525c57bd3" },
      { name: "Space Model Kit", description: "Build your own solar system", price: 49, imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30" },
    ];

    spaceProducts.forEach(product => {
      this.createProduct(product);
    });

    // Videos
    const educationalVideos = [
      { 
        title: "Introduction to Black Holes",
        description: "Learn about the mysteries of black holes",
        thumbnailUrl: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2",
        videoUrl: "https://example.com/video1.mp4",
        duration: 600
      },
      {
        title: "Life of Stars",
        description: "The complete lifecycle of stars explained",
        thumbnailUrl: "https://images.unsplash.com/photo-1592599457638-3ae7ccfbe065",
        videoUrl: "https://example.com/video2.mp4",
        duration: 480
      }
    ];

    educationalVideos.forEach(video => {
      this.createVideo(video);
    });
  }

  // Space Content Methods
  async getAllContent(): Promise<SpaceContent[]> {
    return Array.from(this.content.values());
  }

  async getContentById(id: number): Promise<SpaceContent | undefined> {
    return this.content.get(id);
  }

  async createContent(content: InsertSpaceContent): Promise<SpaceContent> {
    const id = this.currentContentId++;
    const newContent = { ...content, id };
    this.content.set(id, newContent);
    return newContent;
  }

  // Product Methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const newProduct = { ...product, id };
    this.products.set(id, newProduct);
    return newProduct;
  }

  // Video Methods
  async getAllVideos(): Promise<Video[]> {
    return Array.from(this.videos.values());
  }

  async getVideoById(id: number): Promise<Video | undefined> {
    return this.videos.get(id);
  }

  async createVideo(video: InsertVideo): Promise<Video> {
    const id = this.currentVideoId++;
    const newVideo = { ...video, id };
    this.videos.set(id, newVideo);
    return newVideo;
  }
}

export const storage = new MemStorage();
