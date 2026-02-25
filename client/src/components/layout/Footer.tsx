import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 border-t border-secondary-foreground/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-xl font-serif font-semibold tracking-wider">
              Aura <span className="italic text-primary">Mystic</span>
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#home" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">Home</a>
            <a href="#about" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">About</a>
            <a href="#gallery" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">Gallery</a>
            <a href="#contact" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">Contact</a>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-secondary-foreground/10 text-center md:flex md:justify-between md:text-left text-sm text-secondary-foreground/50">
          <p>&copy; {new Date().getFullYear()} Aura Mystic. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed for Spiritual Growth</p>
        </div>
      </div>
    </footer>
  );
}
