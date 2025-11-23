import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star, RotateCcw } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import bgBali from "@/assets/bgBali.png";
import ikonGigi from "@/assets/icon1.png"


interface Card {
  id: string;
  text: string;
  correctZone: "do" | "dont";
}

const cards: Card[] = [
  { id: "1", text: "Sikat gigi 2x sehari", correctZone: "do" },
  { id: "2", text: "Gunakan sikat gigi berbulu lembut", correctZone: "do" },
  { id: "3", text: "Pakai pasta gigi fluoride/sensitif", correctZone: "do" },
  { id: "4", text: "Kumur setelah makan", correctZone: "do" },
  { id: "5", text: "Rutin periksa gigi setiap 6 bulan", correctZone: "do" },
  { id: "6", text: "Makan/minum sangat panas atau dingin", correctZone: "dont" },
  { id: "7", text: "Makanan manis atau asam berlebihan", correctZone: "dont" },
  { id: "8", text: "Makan makanan keras", correctZone: "dont" },
  { id: "9", text: "Menggigit benda keras", correctZone: "dont" },
  { id: "10", text: "Tidak perlu perawatan fluoride", correctZone: "dont" },
];

const shuffleCards = (arr: Card[]) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

// Detect if touch device
const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

const DraggableCard = ({ card }: { card: Card }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: { id: card.id, correctZone: card.correctZone, text: card.text },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [card]);

  return (
    <motion.div
      ref={drag}
      layout={false}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{
        opacity: isDragging ? 0.6 : 1,
        scale: isDragging ? 1.03 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.25 }}
      whileHover={{ scale: 1.02 }}
      style={{ touchAction: "none" }} 
      className="bg-bali-gold text-white px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg cursor-grab active:cursor-grabbing font-medium text-center select-none text-sm sm:text-base"
    >
      {card.text}
    </motion.div>
  );
};

const DropZone = ({
  zone,
  children,
  onCorrectDrop,
  onWrongDrop,
}: {
  zone: "do" | "dont";
  children: React.ReactNode;
  onCorrectDrop: (id: string, zone: "do" | "dont") => void;
  onWrongDrop: (id: string) => void;
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "card",
    drop: (item: { id: string; correctZone: "do" | "dont" }) => {
      if (item.correctZone === zone) {
        onCorrectDrop(item.id, zone);
      } else {
        onWrongDrop(item.id);
      }
      return { zone };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [zone, onCorrectDrop, onWrongDrop]);

  const borderColor = zone === "do" ? "border-green-500" : "border-red-500";
  const bgColor = zone === "do" ? "bg-green-50" : "bg-red-50";
  const titleColor = zone === "do" ? "text-green-600" : "text-red-600";

  return (
    <div
      ref={drop}
      className={`min-h-[250px] sm:min-h-[350px] md:min-h-[400px] rounded-2xl sm:rounded-3xl border-3 sm:border-4 ${borderColor} ${bgColor} p-4 sm:p-6 transition-all ${
        isOver ? "scale-105 shadow-2xl ring-2 sm:ring-4 ring-offset-2" : ""
      } ${isOver && zone === "do" ? "ring-green-300" : ""} ${isOver && zone === "dont" ? "ring-red-300" : ""}`}
    >
      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${titleColor} mb-4 sm:mb-6 text-center flex items-center justify-center gap-2`}>
        {zone === "do" ? <> <span>✓</span> DO</> : <> <span>✗</span> DON'T</>}
      </h2>
      <div className="space-y-2 sm:space-y-3">{children}</div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        {children}
      </motion.div>
    </div>
  );
};

const Game = () => {
  const [availableCards, setAvailableCards] = useState<Card[]>(shuffleCards(cards));
  const [doCards, setDoCards] = useState<Card[]>([]);
  const [dontCards, setDontCards] = useState<Card[]>([]);
  const [score, setScore] = useState(0);
  const [correctDrops, setCorrectDrops] = useState(0);
  const [wrongDrops, setWrongDrops] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const CORRECT_POINTS = 10;
  const WRONG_PENALTY = 3;
  const MAX_SCORE = cards.length * CORRECT_POINTS;

  const handleCorrectDrop = (cardId: string, zone: "do" | "dont") => {
    setAvailableCards(prev => {
      const card = prev.find(c => c.id === cardId);
      if (!card) return prev;
      const updated = prev.filter(c => c.id !== cardId);

      if (zone === "do") {
        setDoCards(prevDo => [...prevDo, card]);
      } else {
        setDontCards(prevDont => [...prevDont, card]);
      }

      setScore(prevScore => prevScore + CORRECT_POINTS);
      setCorrectDrops(prev => prev + 1);

      if (updated.length === 0) {
        setTimeout(() => setShowResult(true), 500);
      }

      return updated;
    });
  };

  const handleWrongDrop = (cardId: string) => {
    setScore(prevScore => prevScore - WRONG_PENALTY);
    setWrongDrops(prev => prev + 1);
  };

  const handleReset = () => {
    setAvailableCards(shuffleCards(cards));
    setDoCards([]);
    setDontCards([]);
    setScore(0);
    setCorrectDrops(0);
    setWrongDrops(0);
    setShowResult(false);
  };

  const percentage = Math.max(0, Math.round((score / MAX_SCORE) * 100));
  const accuracy = percentage;

  const getPerformanceData = () => {
    if (percentage === 100 && wrongDrops === 0) {
      return {
        title: "SEMPURNA! 🏆",
        message: "Luar biasa! Anda menguasai semua materi kesehatan gigi dengan sempurna!",
        stars: 3,
        color: "text-yellow-500"
      };
    } else if (percentage >= 90) {
      return {
        title: "EXCELLENT! 🎉",
        message: "Hebat sekali! Anda sangat memahami kesehatan gigi!",
        stars: 3,
        color: "text-green-500"
      };
    } else if (percentage >= 70) {
      return {
        title: "BAGUS! 👍",
        message: "Kerja yang baik! Terus tingkatkan pengetahuan Anda!",
        stars: 2,
        color: "text-blue-500"
      };
    } else if (percentage >= 50) {
      return {
        title: "CUKUP BAIK! 💪",
        message: "Lumayan! Masih ada ruang untuk belajar lebih banyak!",
        stars: 1,
        color: "text-orange-500"
      };
    } else {
      return {
        title: "COBA LAGI! 📚",
        message: "Jangan menyerah! Mari belajar lebih banyak tentang kesehatan gigi!",
        emoji: "💡",
        stars: 1,
        color: "text-red-500"
      };
    }
  };

  const performanceData = getPerformanceData();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgBali})`,
        }}>
        {/* Header */}
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
          <div className="text-center mb-4 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-teal-700 mb-2 sm:mb-4 px-2">
              DO & DON'T KESEHATAN GIGI
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium px-2">
              Tarik kartu ke kotak yang tepat untuk mendapatkan poin! 
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
              Benar: +{CORRECT_POINTS} poin | Salah: -{WRONG_PENALTY} poin
            </p>
          </div>

          {/* Back to Home Button */}
          <div className="fixed top-4 left-4 z-30">
            <Link to="/">
              <Button
                size="sm"
                className="rounded-full shadow-lg font-semibold border-2 border-bali-gold 
                          bg-white/90 backdrop-blur text-bali-gold hover:bg-amber-50 
                          flex items-center gap-2 px-4 py-2"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>
          </div>


          {/* Score Display - Mobile Top */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="sm:hidden bg-white rounded-xl shadow-lg p-4 mb-4 border-2 border-bali-gold"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-gray-600">SKOR</div>
                <div className="text-2xl font-bold text-bali-gold">{score}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">
                  ✓ {correctDrops} | ✗ {wrongDrops}
                </div>
                <div className="text-sm font-semibold text-gray-700 mt-1">
                  Sisa: {availableCards.length}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Drop Zones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-8 max-w-6xl mx-auto">
            <DropZone zone="do" onCorrectDrop={handleCorrectDrop} onWrongDrop={handleWrongDrop}>
              {doCards.map((card) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-100 text-gray-800 px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-green-300 font-medium text-center shadow-md text-sm sm:text-base"
                >
                  ✓ {card.text}
                </motion.div>
              ))}
            </DropZone>

            <DropZone zone="dont" onCorrectDrop={handleCorrectDrop} onWrongDrop={handleWrongDrop}>
              {dontCards.map((card) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-100 text-gray-800 px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-red-300 font-medium text-center shadow-md text-sm sm:text-base"
                >
                  ✗ {card.text}
                </motion.div>
              ))}
            </DropZone>
          </div>

          {/* Available Cards */}
          <AnimatePresence>
            {availableCards.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/90 backdrop-blur rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl max-w-6xl mx-auto border-2 border-bali-gold"
              >
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 text-center">
                  Kartu yang Tersisa: {availableCards.length}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
                  {availableCards.map((card) => (
                    <DraggableCard key={card.id} card={card} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Score Display - Desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hidden sm:block fixed bottom-4 sm:bottom-8 right-4 sm:right-8 bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 border-3 sm:border-4 border-bali-gold"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <img 
                src={ikonGigi}
                alt="Tooth Icon"
                className="w-20 sm:w-25 h-auto"
              />
              <div>
                <div className="text-xs sm:text-sm font-semibold text-gray-600">SKOR</div>
                <div className="text-2xl sm:text-3xl font-bold text-bali-gold">{score}</div>
                <div className="text-xs text-gray-500">
                  ✓ {correctDrops} | ✗ {wrongDrops}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Buttons */}
          <div className="fixed bottom-4 left-4 flex gap-2 z-20">
            <Button
              size="sm"
              className="sm:size-lg rounded-full shadow-lg font-semibold border-2 border-bali-gold bg-white text-bali-gold hover:bg-amber-50"
              onClick={handleReset}
            >
              <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="hidden sm:inline ml-1">Reset</span>
            </Button>
          </div>
        </div>

        {/* Result Modal */}
        <Modal isOpen={showResult} onClose={() => setShowResult(false)}>
          <div className="text-center py-6 sm:py-8 px-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.7 }}
              className="mb-4 sm:mb-6 flex justify-center"
            >
              <img 
                src={ikonGigi}
                alt="Tooth Icon"
                className="w-20 sm:w-25 h-auto mx-auto"
              />
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 ${performanceData.color}`}
            >
              {performanceData.title}
            </motion.h2>

            {/* Stars Rating */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center gap-2 mb-4 sm:mb-6"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                >
                  <Star 
                    className={`w-6 h-6 sm:w-8 sm:h-8 ${
                      i < performanceData.stars 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6"
            >
              <p className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                Skor Anda: <span className="text-bali-gold">{score}</span> / {MAX_SCORE}
              </p>
              <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center mb-3 sm:mb-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">{correctDrops}</div>
                  <div className="text-xs text-gray-600">Benar</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-orange-600">{wrongDrops}</div>
                  <div className="text-xs text-gray-600">Salah</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-600">{accuracy}%</div>
                  <div className="text-xs text-gray-600">Akurasi</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 mb-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-3 sm:h-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500"
                />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-600">{percentage}% Perfect</p>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 font-medium px-2"
            >
              {performanceData.emoji} {performanceData.message}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2"
            >
              <Button
                onClick={handleReset}
                size="lg"
                className="font-semibold bg-bali-gold hover:bg-yellow-700 text-white w-full sm:w-auto"
              >
                Main Lagi
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="font-semibold border-2 w-full sm:w-auto"
                onClick={() => setShowResult(false)}
              >
                Tutup
              </Button>
            </motion.div>
          </div>
        </Modal>
      </div>
    </DndProvider>
  );
};

export default Game;