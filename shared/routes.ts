import { z } from 'zod';
import { insertGalleryItemSchema, insertContactMessageSchema, galleryItems, contactMessages } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  gallery: {
    list: {
      method: 'GET' as const,
      path: '/api/gallery' as const,
      responses: {
        200: z.array(z.custom<typeof galleryItems.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/gallery' as const,
      input: insertGalleryItemSchema,
      responses: {
        201: z.custom<typeof galleryItems.$inferSelect>(),
        400: errorSchemas.validation,
      },
    }
  },
  contact: {
    create: {
      method: 'POST' as const,
      path: '/api/contact' as const,
      input: insertContactMessageSchema,
      responses: {
        201: z.custom<typeof contactMessages.$inferSelect>(),
        400: errorSchemas.validation,
      },
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type GalleryItemInput = z.infer<typeof api.gallery.create.input>;
export type ContactMessageInput = z.infer<typeof api.contact.create.input>;
export type GalleryItemResponse = z.infer<typeof api.gallery.create.responses[201]>;
export type ContactMessageResponse = z.infer<typeof api.contact.create.responses[201]>;
export type GalleryItemsListResponse = z.infer<typeof api.gallery.list.responses[200]>;
