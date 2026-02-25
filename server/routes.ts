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
      imageUrl: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=600",
      category: "certificate"
    });
    await storage.createGalleryItem({
      title: "Reiki Grandmaster Certification",
      description: "Advanced certification as a Reiki Grandmaster.",
      imageUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=600",
      category: "certificate"
    });
    await storage.createGalleryItem({
      title: "Access Bars Healing Session",
      description: "A transformative session for mental clarity.",
      imageUrl: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=600",
      category: "work"
    });
    await storage.createGalleryItem({
      title: "Custom Protection Sigil",
      description: "Hand-crafted sigil for personal protection and grounding.",
      imageUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=600",
      category: "work"
    });
    await storage.createGalleryItem({
      title: "Crystal Healing Grid",
      description: "Harmonizing energies using sacred geometry and crystals.",
      imageUrl: "https://images.unsplash.com/photo-1522228115018-d838bcce5c3a?q=80&w=600",
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
