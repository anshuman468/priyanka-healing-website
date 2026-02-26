import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const items = await storage.getGalleryItems();
  if (items.length === 0) {
    await storage.createGalleryItem({
      title: "Spiritual Cleanse Certificate",
      description: "Certification in profound energy cleansing.",
      imageUrl: "/images/cert1.jpg",
      category: "certificate"
    });
    await storage.createGalleryItem({
      title: "Reiki Grandmaster Certification",
      description: "Advanced certification as a Reiki Grandmaster.",
      imageUrl: "/images/cert2.jpg",
      category: "certificate"
    });
    await storage.createGalleryItem({
      title: "Access Bars Healing Session",
      description: "A transformative session for mental clarity.",
      imageUrl: "/images/work1.jpg",
      category: "work"
    });
    await storage.createGalleryItem({
      title: "Custom Protection Sigil",
      description: "Hand-crafted sigil for personal protection and grounding.",
      imageUrl: "/images/work2.jpg",
      category: "work"
    });
    await storage.createGalleryItem({
      title: "Crystal Healing Grid",
      description: "Harmonizing energies using sacred geometry and crystals.",
      imageUrl: "/images/work3.jpg",
      category: "work"
    });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed initial content
  await seedDatabase();

  app.get(api.gallery.list.path, async (req, res) => {
    try {
      const items = await storage.getGalleryItems();
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch gallery items" });
    }
  });

  app.post(api.gallery.create.path, async (req, res) => {
    try {
      const input = api.gallery.create.input.parse(req.body);
      const item = await storage.createGalleryItem(input);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const message = await storage.createContactMessage(input);
      
      // For now, we log it. Once the email integration is connected, 
      // we can add the actual sending logic here.
      console.log(`New contact message for jinaborah2016@gmail.com:`, input);

      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
