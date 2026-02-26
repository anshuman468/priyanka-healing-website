import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function About() {
  const skills = [
    "Access Bars Practitioner",
    "Professional Spell Caster",
    "Custom Sigil Maker",
    "Reiki Grandmaster",
    "Maa Kali Healing",
    "Energy Clearing & Balancing",
  ];

  return (
    <section id="about" className="py-24 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative z-10 shadow-2xl">
              {/* spiritual healing reiki hands */}
              <img
                src="/images/work1.jpeg"
                alt="Healing hands"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl" />
            </div>

            {/* Decorative background elements */}
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-secondary rounded-2xl -z-10" />
            <div className="absolute -top-6 -right-6 w-48 h-48 border-2 border-primary/30 rounded-2xl -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
              About Me
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-6 leading-tight">
              Transforming Lives Through{" "}
              <span className="italic text-secondary">Ancient Wisdom</span>
            </h3>

            <div className="space-y-4 text-muted-foreground text-lg font-light leading-relaxed mb-8">
              <p>
                Welcome to a sacred space of transformation. I am dedicated to
                helping individuals clear blockages, manifest their deepest
                desires, and heal on a profound soul level using time-honored
                mystical practices.
              </p>
              <p>
                As an Access Bars Practitioner and Reiki Grandmaster, I channel
                universal life force energy to bring harmony to your mind, body,
                and spirit. My work with Maa Kali healing provides powerful
                protective and transformative energy to cut through negativity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
