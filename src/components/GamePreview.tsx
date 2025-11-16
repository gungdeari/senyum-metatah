import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gamepad2 } from "lucide-react";
import ikonGames from "@/assets/icon5.png"
import bgPatternBali from "@/assets/bgBali.png"

const GamePreview = () => {
  return (
    <section 
      id="game-preview"
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage: `
          url(${bgPatternBali})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}
    >
      {/* Bali Pattern Background */}
      <div className="" style={{
      }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          {/* Character illustrations and game icons */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-12">
            {/* Left side - Cute tooth characters */}
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
                className="w-100 h-64 drop-shadow-lg"
              />
            </motion.div>

            {/* Right side - Game info */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="mb-6 flex justify-center lg:justify-start"
              >
                <div className="bg-white p-4 rounded-full shadow-lg">
                  <Gamepad2 size={48} className="text-[#B8860B]" />
                </div>
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ayo Bermain Games
              </h2>
              
              <div className="bg-white p-8 rounded-3xl shadow-2xl mb-8 border-4 border-[#B8860B]/20">
                <h3 className="text-3xl font-bold mb-4">
                  <span style={{ color: '#006D5B' }}>Do</span>{' '}
                  <span className="text-gray-700">and</span>{' '}
                  <span style={{ color: '#DC2626' }}>Don't</span>{' '}
                  <span className="text-gray-800">Games</span>
                </h3>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  Ayo uji pengetahuan kamu mengenai apa yang harus dan tidak boleh dilakukan saat merawat gigi!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <div className="bg-green-50 px-6 py-3 rounded-full border-2 border-green-200 shadow-sm">
                    <span style={{ color: '#006D5B' }} className="font-semibold">✓ DO</span>
                    <span className="text-gray-600"> - Kebiasaan Baik</span>
                  </div>
                  <div className="bg-red-50 px-6 py-3 rounded-full border-2 border-red-200 shadow-sm">
                    <span className="text-red-600 font-semibold">✗ DON'T</span>
                    <span className="text-gray-600"> - Hindari Ini</span>
                  </div>
                </div>
              </div>
              
              <Link to="/game">
                <Button
                  size="lg"
                  className="font-semibold px-12 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                  style={{ 
                    backgroundColor: '#B8860B',
                    color: 'white'
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