import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Category = "all" | "work" | "certificate";

export function Gallery() {
  const [filter, setFilter] = useState<Category>("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Local images from /client/public/images
  const defaultItems = [
    {
      id: 1,
      title: "Healing Session",
      description: "Personalized energy healing session.",
      imageUrl: "/images/myphoto.jpeg",
      category: "work",
    },
    {
      id: 2,
      title: "Reiki Grandmaster Certificate",
      description: "Official Reiki Grandmaster certification.",
      imageUrl: "/images/cer2.jpg",
      category: "certificate",
    },
    {
      id: 3,
      title: "Access Bars Practice",
      description: "Hands-on Access Bars healing practice.",
      imageUrl: "/images/work2.jpg",
      category: "work",
    },
    {
      id: 4,
      title: "Access Bars Certificate",
      description: "Certified Access Bars Practitioner.",
      imageUrl: "/images/cer1.jpg",
      category: "certificate",
    },
  ];

  const filteredItems = defaultItems.filter(
    (item) => filter === "all" || item.category === filter,
  );

  return (
    <section id="gallery" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Portfolio
          </h2>

          <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-8">
            Work & Certifications
          </h3>

          <div className="inline-flex bg-background p-1.5 rounded-full shadow-sm border border-border">
            {(["all", "work", "certificate"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === cat
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-xl transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedImage(item.imageUrl)}
              >
                <div className="aspect-[3/2] overflow-hidden bg-muted">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 block">
                    {item.category}
                  </span>

                  <h4 className="text-xl font-serif text-foreground mb-2">
                    {item.title}
                  </h4>

                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fullscreen Preview */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center px-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>

            <motion.img
              src={selectedImage}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
