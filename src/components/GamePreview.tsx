import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gamepad2 } from "lucide-react";
import ikonGames from "@/assets/icon5.png";
import bgPatternBali from "@/assets/bgBali.png";

const GamePreview = () => {
  return (
    <section
      id="game-preview"
      className="relative py-14 md:py-20 overflow-hidden"
      style={{
        backgroundImage: `url(${bgPatternBali})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-14">
            
            {/* Left Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex-shrink-0"
            >
              <img
                src={ikonGames}
                alt="Dental characters"
                className="w-48 sm:w-60 md:w-72 lg:w-80 xl:w-96 h-auto drop-shadow-lg mx-auto"
              />
            </motion.div>

            {/* Right Content */}
            <div className="flex-1 text-center lg:text-left">
              
              {/* Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="mb-4 md:mb-6 flex justify-center lg:justify-start"
              >
                <div className="bg-white p-3 md:p-4 rounded-full shadow-lg">
                  <Gamepad2 size={38} className="md:size-32 text-[#B8860B]" />
                </div>
              </motion.div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
                Ayo Bermain Games
              </h2>

              {/* Game Card */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl mb-6 md:mb-8 border-4 border-[#B8860B]/20">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                  <span className="text-[#006D5B]">Do</span>{" "}
                  <span className="text-gray-700">and</span>{" "}
                  <span className="text-red-600">Don't</span>{" "}
                  <span className="text-gray-800">Games</span>
                </h3>

                <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed">
                  Ayo uji pengetahuan kamu mengenai apa yang boleh dan tidak
                  boleh dilakukan saat merawat kesehatan gigi!
                </p>

                {/* DO & DONT Labels */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <div className="bg-green-50 px-5 py-3 rounded-full border-2 border-green-200 shadow-sm">
                    <span className="text-[#006D5B] font-semibold">✓ DO</span>
                    <span className="text-gray-600"> - Kebiasaan Baik</span>
                  </div>

                  <div className="bg-red-50 px-5 py-3 rounded-full border-2 border-red-200 shadow-sm">
                    <span className="text-red-600 font-semibold">✗ DON'T</span>
                    <span className="text-gray-600"> - Hindari Ini</span>
                  </div>
                </div>
              </div>

              {/* Button */}
              <Link to="/game">
                <Button
                  size="lg"
                  className="font-semibold text-base sm:text-lg px-10 sm:px-12 py-4 sm:py-6 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                  style={{
                    backgroundColor: "#B8860B",
                    color: "white",
                  }}
                >
                  Mainkan Sekarang
                </Button>
              </Link>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GamePreview;
