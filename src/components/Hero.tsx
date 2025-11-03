import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-metatah.jpg";

const Hero = () => {
  const scrollToEducation = () => {
    const element = document.getElementById("education");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 pattern-bg" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Senyum Sehat Setelah Metatah
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Pelajari cara menjaga kebersihan dan kesehatan gigi pasca upacara metatah
        </p>
        <Button
          onClick={scrollToEducation}
          size="lg"
          className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-2xl"
        >
          Mulai Belajar 🦷
        </Button>
      </motion.div>
    </section>
  );
};

export default Hero;
