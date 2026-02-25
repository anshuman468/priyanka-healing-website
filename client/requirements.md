## Packages
framer-motion | Page transitions and scroll-triggered animations for a premium feel
react-hook-form | Form state management
@hookform/resolvers | Zod validation integration for forms

## Notes
- Images are sourced dynamically from Unsplash for placeholders, ensuring the application looks beautiful even without user uploads initially.
- The gallery endpoint `GET /api/gallery` should return objects with `{ id, title, description, imageUrl, category }`. Categories are expected to be 'work' or 'certificate'.
- Form submission to `POST /api/contact` expects `{ name, email, message }`.
