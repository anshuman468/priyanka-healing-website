import { db } from "./db";
import { 
  galleryItems, contactMessages,
  type CreateGalleryItemRequest, type CreateContactMessageRequest,
  type GalleryItemResponse, type ContactMessageResponse 
} from "@shared/schema";

export interface IStorage {
  getGalleryItems(): Promise<GalleryItemResponse[]>;
  createGalleryItem(item: CreateGalleryItemRequest): Promise<GalleryItemResponse>;
  createContactMessage(message: CreateContactMessageRequest): Promise<ContactMessageResponse>;
}

export class DatabaseStorage implements IStorage {
  async getGalleryItems(): Promise<GalleryItemResponse[]> {
    return await db.select().from(galleryItems);
  }

  async createGalleryItem(item: CreateGalleryItemRequest): Promise<GalleryItemResponse> {
    const [newItem] = await db.insert(galleryItems).values(item).returning();
    return newItem;
  }

  async createContactMessage(message: CreateContactMessageRequest): Promise<ContactMessageResponse> {
    const [newMessage] = await db.insert(contactMessages).values(message).returning();
    return newMessage;
  }
}

export const storage = new DatabaseStorage();
