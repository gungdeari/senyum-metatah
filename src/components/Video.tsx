import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import thumb from "@/assets/metatah-thumb.png";

const Video = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="video" className="relative py-16 md:py-20 bg-card">
      <div className="absolute inset-0 pattern-bg" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-black mb-3">
            Video Edukasi Metatah dan Kesehatan Gigi
          </h2>
          <p className="text-base md:text-lg text-black max-w-2xl mx-auto">
            Pelajari tradisi dan perawatan gigi melalui video edukatif
          </p>
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-xl bg-black group">

            {!isPlaying ? (
              <div
                className="absolute inset-0 bg-cover bg-center flex items-center justify-center cursor-pointer transition-all hover:scale-[1.02]"
                style={{ backgroundImage: `url(${thumb})` }}
                onClick={() => setIsPlaying(true)}
              >
                <div className="absolute inset-0 bg-black/40 md:bg-black/50" />

                <div className="relative z-10 text-center px-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="inline-block"
                  >
                    <div className="bg-white/30 backdrop-blur-sm p-6 md:p-8 rounded-full mb-4 md:mb-6">
                      <Play
                        size={40}
                        className="md:size-16 text-white"
                        fill="white"
                      />
                    </div>
                  </motion.div>

                  <h3 className="text-lg md:text-2xl font-bold text-white mb-1">
                    Tonton
                  </h3>
                  <p className="text-sm md:text-lg text-white">
                    Dokumenter Video, Proses Upacara Metatah
                  </p>
                </div>
              </div>
            ) : (
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/uj1zEaPgItM?autoplay=1"
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
