import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGallery } from "@/hooks/use-gallery";
import { Skeleton } from "@/components/ui/skeleton";
import { FileImage } from "lucide-react";

type Category = 'all' | 'work' | 'certificate';

export function Gallery() {
  const { data: items, isLoading } = useGallery();
  const [filter, setFilter] = useState<Category>('all');

  // Fallback placeholder data if API returns empty
  const defaultItems = [
    {
      id: 1,
      title: "Crystal Grid Alignment",
      description: "A customized crystal grid designed for manifesting abundance.",
      imageUrl: "https://images.unsplash.com/photo-1550756782-b7e1ce8e27c8?auto=format&fit=crop&q=80&w=800",
      category: "work"
    },
    {
      id: 2,
      title: "Reiki Grandmaster Certification",
      description: "Official certification of Grandmaster level training.",
      imageUrl: "https://images.unsplash.com/photo-1589330694653-efa64753ba13?auto=format&fit=crop&q=80&w=800",
      category: "certificate"
    },
    {
      id: 3,
      title: "Personalized Sigil",
      description: "A protective sigil crafted specifically for a client's home.",
      imageUrl: "https://images.unsplash.com/photo-1615554868478-f7b6058097b6?auto=format&fit=crop&q=80&w=800",
      category: "work"
    },
    {
      id: 4,
      title: "Access Bars Diploma",
      description: "Certified practitioner of Access Consciousness Bars.",
      imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
      category: "certificate"
    },
  ];

  const displayItems = items && items.length > 0 ? items : defaultItems;
  const filteredItems = displayItems.filter(item => filter === 'all' || item.category === filter);

  return (
    <section id="gallery" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Portfolio</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-8">Work & Certifications</h3>
          
          <div className="inline-flex bg-background p-1.5 rounded-full shadow-sm border border-border">
            {(['all', 'work', 'certificate'] as const).map((cat) => (
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

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-[300px] w-full rounded-2xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
              <FileImage className="w-10 h-10 text-muted-foreground" />
            </div>
            <h4 className="text-xl font-serif text-foreground mb-2">No items found</h4>
            <p className="text-muted-foreground">There are currently no items in this category.</p>
          </div>
        ) : (
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
                  className="group relative bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-xl transition-all duration-500"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 block">
                      {item.category}
                    </span>
                    <h4 className="text-xl font-serif text-foreground mb-2">{item.title}</h4>
                    <p className="text-muted-foreground text-sm line-clamp-2">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
