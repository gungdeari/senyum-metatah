import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import toothMascot from "@/assets/tooth-mascot.png";
import Modal from "@/components/Modal";

interface Card {
  id: string;
  text: string;
  correctZone: "do" | "dont";
}

const cards: Card[] = [
  { id: "1", text: "Sikat gigi 2x sehari", correctZone: "do" },
  { id: "2", text: "Merokok dan Vaping", correctZone: "dont" },
  { id: "3", text: "Flossing setiap hari", correctZone: "do" },
  { id: "4", text: "Makan Permen Sebelum Tidur", correctZone: "dont" },
  { id: "5", text: "Minum Soda Setiap Hari", correctZone: "dont" },
  { id: "6", text: "Menggigit Benda Keras", correctZone: "dont" },
];

const DraggableCard = ({ card, onDrop }: { card: Card; onDrop: (id: string) => void }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: { id: card.id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<{ zone: string }>();
      if (item && dropResult) {
        onDrop(card.id);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isDragging ? 0.5 : 1, scale: isDragging ? 1.05 : 1 }}
      whileHover={{ scale: 1.05 }}
      className="bg-secondary text-white px-6 py-4 rounded-2xl shadow-lg cursor-move font-medium text-center hover:shadow-xl transition-all"
    >
      {card.text}
    </motion.div>
  );
};

const DropZone = ({
  zone,
  children,
  onCardDropped,
}: {
  zone: "do" | "dont";
  children: React.ReactNode;
  onCardDropped: (zone: string) => void;
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "card",
    drop: () => {
      onCardDropped(zone);
      return { zone };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const borderColor = zone === "do" ? "border-success" : "border-destructive";
  const bgColor = zone === "do" ? "bg-success/5" : "bg-destructive/5";
  const titleColor = zone === "do" ? "text-success" : "text-destructive";

  return (
    <div
      ref={drop}
      className={`min-h-[300px] rounded-3xl border-4 ${borderColor} ${bgColor} p-6 transition-all ${
        isOver ? "scale-105 shadow-2xl" : ""
      }`}
    >
      <h2 className={`text-4xl font-bold ${titleColor} mb-6 text-center`}>
        {zone === "do" ? "DO" : "DON'T"}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
};

const Game = () => {
  const [availableCards, setAvailableCards] = useState<Card[]>(cards);
  const [doCards, setDoCards] = useState<Card[]>([]);
  const [dontCards, setDontCards] = useState<Card[]>([]);
  const [score, setScore] = useState(0);
  const [droppedZone, setDroppedZone] = useState<string>("");
  const [showResult, setShowResult] = useState(false);

  const handleDrop = (cardId: string) => {
    const card = availableCards.find((c) => c.id === cardId);
    if (!card || !droppedZone) return;

    setAvailableCards((prev) => prev.filter((c) => c.id !== cardId));

    if (droppedZone === card.correctZone) {
      setScore((prev) => prev + 1);
    }

    if (droppedZone === "do") {
      setDoCards((prev) => [...prev, card]);
    } else {
      setDontCards((prev) => [...prev, card]);
    }

    setDroppedZone("");

    if (availableCards.length === 1) {
      setTimeout(() => setShowResult(true), 500);
    }
  };

  const handleReset = () => {
    setAvailableCards(cards);
    setDoCards([]);
    setDontCards([]);
    setScore(0);
    setShowResult(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-background">
        <div className="absolute inset-0 pattern-bg" />
        
        {/* Header */}
        <div className="relative z-10 container mx-auto px-4 py-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft size={20} className="mr-2" />
              Kembali ke Home
            </Button>
          </Link>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-5xl">🎮</span>
              <h1 className="text-4xl md:text-5xl font-bold text-primary">
                DO AND DON'T'S KESEHATAN GIGI
              </h1>
            </div>
            <p className="text-lg text-foreground">Tarik kartu ke kotak yang tepat</p>
          </div>

          {/* Drop Zones */}
          <div className="grid md:grid-cols-2 gap-8 mb-8 max-w-6xl mx-auto">
            <DropZone zone="do" onCardDropped={setDroppedZone}>
              {doCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-success/20 text-foreground px-6 py-4 rounded-2xl border-2 border-success/40 font-medium text-center"
                >
                  {card.text}
                </div>
              ))}
            </DropZone>

            <DropZone zone="dont" onCardDropped={setDroppedZone}>
              {dontCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-destructive/20 text-foreground px-6 py-4 rounded-2xl border-2 border-destructive/40 font-medium text-center"
                >
                  {card.text}
                </div>
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
                className="bg-card rounded-3xl p-8 shadow-xl max-w-6xl mx-auto"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableCards.map((card) => (
                    <DraggableCard key={card.id} card={card} onDrop={handleDrop} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Score Display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-8 right-8 bg-card rounded-2xl shadow-2xl p-6 flex items-center gap-4"
          >
            <img src={toothMascot} alt="Tooth Mascot" className="w-16 h-16" />
            <div>
              <div className="text-sm text-muted-foreground">SKOR</div>
              <div className="text-3xl font-bold text-secondary">{score}</div>
            </div>
          </motion.div>

          {/* Back to Home Button Bottom */}
          <div className="fixed bottom-8 left-8">
            <Link to="/">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 rounded-full shadow-2xl"
              >
                KEMBALI
              </Button>
            </Link>
          </div>
        </div>

        {/* Result Modal */}
        <Modal isOpen={showResult} onClose={() => setShowResult(false)}>
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <img src={toothMascot} alt="Success" className="w-32 h-32 mx-auto mb-6" />
            </motion.div>
            <h2 className="text-4xl font-bold text-primary mb-4">Selamat!</h2>
            <p className="text-2xl text-foreground mb-2">
              Skor Anda: <span className="text-secondary font-bold">{score}</span> / {cards.length}
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              {score === cards.length
                ? "Sempurna! Anda sangat memahami kesehatan gigi! 🎉"
                : score >= cards.length / 2
                ? "Bagus! Terus belajar ya! 👍"
                : "Ayo coba lagi dan pelajari lebih banyak! 💪"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleReset}
                size="lg"
                className="bg-secondary hover:bg-secondary/90"
              >
                Main Lagi
              </Button>
              <Link to="/">
                <Button size="lg" variant="outline">
                  Kembali ke Home
                </Button>
              </Link>
            </div>
          </div>
        </Modal>
      </div>
    </DndProvider>
  );
};

export default Game;
