import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/home.png";

const Hero = () => {
  const scrollToEducation = () => {
    const element = document.getElementById("education");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Overlay - black with 50% opacity */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Optional: subtle gradient (black to transparent, bottom to top) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Pattern Overlay (if you want to keep it, you can leave this) */}
      <div className="absolute inset-0 pattern-bg" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Senyum Sehat Setelah Metatah
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Pelajari cara menjaga kebersihan dan kesehatan gigi pasca upacara metatah
        </p>
        <Button
          onClick={scrollToEducation}
          size="lg"
          className="bg-bali-gold hover:bg-bali-gold/80 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-2xl"
        >
          Mulai Belajar
        </Button>
      </motion.div>
    </section>
  );
};

export default Hero;
