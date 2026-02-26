import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/myphoto.jpeg"
          alt="Healing atmosphere"
          className="w-full h-full object-cover object-center brightness-110 contrast-110 saturate-110"
        />

        {/* Dark overlay for text clarity */}
        <div className="absolute inset-0 bg-black/50 z-10" />
      </div>

      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary text-sm font-semibold tracking-wider uppercase mb-6 border border-primary/30 drop-shadow">
            Spiritual Healing & Mysticism
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight text-balance drop-shadow-xl">
            Access Bars{" "}
            <span className="text-primary italic">Practitioner...</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 drop-shadow-md mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Access Bars Practitioner • Spell Caster • Sigil Maker
            <br className="hidden md:block" />
            Reiki Grandmaster • Maa Kali Healing
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 h-14 text-base shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
            >
              <a href="#contact">
                Begin Your Journey <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-8 h-14 text-base border-2 border-white text-white hover:bg-white/10"
            >
              <a href="#about">Discover More</a>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none z-0" />
    </section>
  );
}
