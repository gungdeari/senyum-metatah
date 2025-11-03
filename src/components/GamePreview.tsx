import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gamepad2 } from "lucide-react";

const GamePreview = () => {
  return (
    <section id="game-preview" className="relative py-20 bg-background">
      <div className="absolute inset-0 pattern-bg" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="mb-8">
            <Gamepad2 size={64} className="text-secondary mx-auto mb-4" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Ayo Bermain Games
          </h2>
          <div className="bg-card p-8 rounded-2xl shadow-lg mb-8">
            <h3 className="text-2xl font-semibold text-secondary mb-4">
              Do and <span className="text-destructive">Don't</span>s Games
            </h3>
            <p className="text-foreground text-lg mb-6">
              Ayo uji pengetahuan kamu mengenai apa yang harus dan tidak boleh dilakukan saat merawat gigi!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-success/10 px-6 py-3 rounded-full border-2 border-success/30">
                <span className="text-success font-semibold">✓ DO</span> - Kebiasaan Baik
              </div>
              <div className="bg-destructive/10 px-6 py-3 rounded-full border-2 border-destructive/30">
                <span className="text-destructive font-semibold">✗ DON'T</span> - Hindari Ini
              </div>
            </div>
          </div>
          <Link to="/game">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-12 py-6 text-lg rounded-full shadow-lg"
            >
              Mainkan Sekarang 🎮
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GamePreview;
