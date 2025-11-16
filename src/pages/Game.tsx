import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import toothMascot from "@/assets/icon1.png";
import Modal from "@/components/Modal";
import backgroundBali from "@/assets/pop-up-bg.png"

interface Card {
  id: string;
  text: string;
  correctZone: "do" | "dont";
}

const cards: Card[] = [
  // DO Cards - Kebiasaan Baik (5 cards)
  { id: "1", text: "Sikat gigi 2x sehari", correctZone: "do" },
  { id: "2", text: "Flossing setiap hari", correctZone: "do" },
  { id: "3", text: "Minum air putih yang cukup", correctZone: "do" },
  { id: "4", text: "Konsumsi makanan bergizi", correctZone: "do" },
  { id: "5", text: "Rutin periksa ke dokter gigi", correctZone: "do" },
  { id: "6", text: "Merokok dan Vaping", correctZone: "dont" },
  { id: "7", text: "Makan permen sebelum tidur", correctZone: "dont" },
  { id: "8", text: "Minum soda setiap hari", correctZone: "dont" },
  { id: "9", text: "Menggigit benda keras", correctZone: "dont" },
  { id: "10", text: "Menggunakan tusuk gigi kasar", correctZone: "dont" },
];

const shuffleCards = (arr: Card[]) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

// DraggableCard.tsx (inline component)
const DraggableCard = ({ card }: { card: Card }) => {
  const [shake, setShake] = useState(false);

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
        x: shake ? [0, -6, 6, -6, 6, 0] : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.25 }}
      whileHover={{ scale: 1.02 }}
      style={{ touchAction: "none" }} 
      className="bg-bali-gold text-white px-6 py-4 rounded-2xl shadow-lg cursor-grab active:cursor-grabbing font-medium text-center select-none"
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
      // item.correctZone ada di sini — kita putuskan benar / salah sekarang
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
      className={`min-h-[400px] rounded-3xl border-4 ${borderColor} ${bgColor} p-6 transition-all ${
        isOver ? "scale-105 shadow-2xl ring-4 ring-offset-2" : ""
      } ${isOver && zone === "do" ? "ring-green-300" : ""} ${isOver && zone === "dont" ? "ring-red-300" : ""}`}
    >
      <h2 className={`text-4xl font-bold ${titleColor} mb-6 text-center flex items-center justify-center gap-2`}>
        {zone === "do" ? <> <span>✓</span> DO</> : <> <span>✗</span> DON'T</>}
      </h2>
      <div className="space-y-3">{children}</div>
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

  // Point system: 10 points per correct drop, -3 points per wrong drop
  const CORRECT_POINTS = 10;
  const WRONG_PENALTY = 3;
  const MAX_SCORE = cards.length * CORRECT_POINTS;

  // inside Game component

const handleCorrectDrop = (cardId: string, zone: "do" | "dont") => {
  // find in availableCards
  setAvailableCards(prev => {
    const card = prev.find(c => c.id === cardId);
    if (!card) return prev; // nothing to do
    const updated = prev.filter(c => c.id !== cardId);

    // assign to zone state
    if (zone === "do") {
      setDoCards(prevDo => [...prevDo, card]);
    } else {
      setDontCards(prevDont => [...prevDont, card]);
    }

    // add points
    setScore(prevScore => prevScore + CORRECT_POINTS);
    setCorrectDrops(prev => prev + 1);

    if (updated.length === 0) {
      setTimeout(() => setShowResult(true), 500);
    }

    return updated;
  });
};

const handleWrongDrop = (cardId: string) => {
  // if card still in available, optionally show shake on card (not implemented here)
  setShakeCard(cardId);
  setTimeout(() => setShakeCard(null), 500); 

  setAvailableCards(prev => {
    // ensure card still exists (no double remove)
    const exists = prev.some(c => c.id === cardId);
    const updated = prev;

    // decrease score (allow negative)
    setScore(prevScore => prevScore - WRONG_PENALTY);
    setWrongDrops(prev => prev + 1);

    // If you prefer to temporarily disable the card for a moment, you can remove then re-add...
    return updated;
  });
};

const [shakeCard, setShakeCard] = useState(null);

const handleReset = () => {
  setAvailableCards(shuffleCards(cards));
  setDoCards([]);
  setDontCards([]);
  setScore(0);
  setCorrectDrops(0);
  setWrongDrops(0);
  setShowResult(false);
};

  // Calculate performance metrics
  const percentage = Math.round((score / MAX_SCORE) * 100);
  const accuracy = percentage;

  // Get performance message and rating
  const getPerformanceData = () => {
    if (percentage === 100 && wrongDrops === 0) {
      return {
        title: "SEMPURNA! 🏆",
        message: "Luar biasa! Anda menguasai semua materi kesehatan gigi dengan sempurna!",
        emoji: "🌟",
        stars: 5,
        color: "text-yellow-500"
      };
    } else if (percentage >= 90) {
      return {
        title: "EXCELLENT! 🎉",
        message: "Hebat sekali! Anda sangat memahami kesehatan gigi!",
        emoji: "⭐",
        stars: 4,
        color: "text-green-500"
      };
    } else if (percentage >= 70) {
      return {
        title: "BAGUS! 👍",
        message: "Kerja yang baik! Terus tingkatkan pengetahuan Anda!",
        emoji: "😊",
        stars: 2,
        color: "text-blue-500"
      };
    } else if (percentage >= 50) {
      return {
        title: "CUKUP BAIK! 💪",
        message: "Lumayan! Masih ada ruang untuk belajar lebih banyak!",
        emoji: "🙂",
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
      <div className="min-h-screen relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            backgroundImage: `url(${backgroundBali})`,
            backgroundSize: "cover",
            backgroundRepeat: "repeat",
          }}
        /> 
        
        {/* Header */}
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              {/* <span className="text-5xl"></span> */}
              <h1 className="text-4xl md:text-5xl font-bold" style={{ color: '#006D5B' }}>
                DO AND DON'T KESEHATAN GIGI
              </h1>
            </div>
            <p className="text-lg text-gray-700 font-medium">
              Tarik kartu ke kotak yang tepat untuk mendapatkan poin! 
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Benar: +{CORRECT_POINTS} poin | salah: -{WRONG_PENALTY} poin
            </p>
          </div>

          {/* Drop Zones */}
          <div className="grid md:grid-cols-2 gap-8 mb-8 max-w-6xl mx-auto">
            <DropZone zone="do" onCorrectDrop={handleCorrectDrop} onWrongDrop={handleWrongDrop}>
              {doCards.map((card) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-100 text-gray-800 px-6 py-4 rounded-2xl border-2 border-green-300 font-medium text-center shadow-md"
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
                  className="bg-red-100 text-gray-800 px-6 py-4 rounded-2xl border-2 border-red-300 font-medium text-center shadow-md"
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
                className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl max-w-6xl mx-auto border-2 border-[#B8860B]/20"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  Kartu yang Tersisa: {availableCards.length}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {availableCards.map((card) => (
                    <DraggableCard 
                      key={card.id} 
                      card={card}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Score Display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-8 right-8 bg-white rounded-2xl shadow-2xl p-6 border-4 border-[#B8860B]"
          >
            <div className="flex items-center gap-4">
              <img src={toothMascot} alt="Tooth Mascot" className="w-16 h-16" />
              <div>
                <div className="text-sm font-semibold text-gray-600">SKOR</div>
                <div className="text-3xl font-bold" style={{ color: '#B8860B' }}>{score}</div>
                <div className="text-xs text-gray-500">
                  ✓ {correctDrops} | ✗ {wrongDrops}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Back to Home Button Bottom */}
          <div className="fixed bottom-8 left-8">
            <Link to="/">
              <Button
                size="lg"
                className="rounded-full shadow-2xl font-semibold border-2 border-[#B8860B]"
                style={{ 
                  backgroundColor: '#FAFAFA',
                  color: '#B88626'
                }}
              >
                KEMBALI
              </Button>
            </Link>
          </div>
        </div>

        {/* Result Modal */}
        <Modal isOpen={showResult} onClose={() => setShowResult(false)}>
          <div className="text-center py-8 px-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.7 }}
              className="mb-6"
            >
              <div className="relative inline-block">
                <img src={toothMascot} alt="Success" className="w-32 h-32 mx-auto" />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -top-2 -right-2"
                >
                </motion.div>
              </div>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-4xl font-bold mb-4 ${performanceData.color}`}
            >
              {performanceData.title}
            </motion.h2>

            {/* Stars Rating */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center gap-2 mb-6"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                >
                  <Star 
                    className={`w-8 h-8 ${
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
              className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6"
            >
              <p className="text-2xl font-bold text-gray-800 mb-4">
                Skor Anda: <span style={{ color: '#B8860B' }}>{score}</span> / {MAX_SCORE}
              </p>
              <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div>
                  <div className="text-3xl font-bold text-green-600">{correctDrops}</div>
                  <div className="text-xs text-gray-600">Benar</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600">{wrongDrops}</div>
                  <div className="text-xs text-gray-600">Salah</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-600">{accuracy}%</div>
                  <div className="text-xs text-gray-600">Akurasi</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500"
                />
              </div>
              <p className="text-sm font-semibold text-gray-600">{percentage}% Perfect</p>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-700 mb-8 font-medium"
            >
              {performanceData.emoji} {performanceData.message}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={handleReset}
                size="lg"
                className="font-semibold"
                style={{ 
                  backgroundColor: '#B8860B',
                  color: 'white'
                }}
              >
                 Main Lagi
              </Button>
              <Link to="/">
                <Button size="lg" variant="outline" className="font-semibold border-2">
                 Kembali ke Home
                </Button>
              </Link>
            </motion.div>
          </div>
        </Modal>
      </div>
    </DndProvider>
  );
};

export default Game;