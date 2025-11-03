import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const Video = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="video" className="relative py-20 bg-card">
      <div className="absolute inset-0 pattern-bg" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Video Edukasi Metatah dan Kesehatan Gigi
          </h2>
          <p className="text-lg text-muted-foreground">
            Pelajari tradisi dan perawatan gigi melalui video edukatif
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black group">
            {!isPlaying ? (
              <div 
                className="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/90 flex items-center justify-center cursor-pointer transition-all hover:scale-105"
                onClick={() => setIsPlaying(true)}
              >
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="inline-block"
                  >
                    <div className="bg-white/20 backdrop-blur-sm p-8 rounded-full mb-6">
                      <Play size={64} className="text-white" fill="white" />
                    </div>
                  </motion.div>
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">Tonton</h3>
                    <p className="text-lg">Dokumenter Video, Proses Upacara Metatah</p>
                  </div>
                </div>
              </div>
            ) : (
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Video Edukasi Metatah"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Video;
